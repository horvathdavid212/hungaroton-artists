import http from 'node:http'
import { URL } from 'node:url'

const DEFAULT_PER_PAGE = 50
const RETRY_FAILURE_COUNT = 1
const host = '127.0.0.1'
const port = Number(process.argv[2] ?? 3101)

const createArtist = (id, name, type, albumCount, portrait) => ({
  albumCount,
  id,
  name,
  portrait,
  type
})

const primaryArtists = Array.from({ length: 54 }, (_, index) => {
  const artistNumber = String(index + 1).padStart(2, '0')

  return createArtist(
    `primary-${artistNumber}`,
    `Primary Artist ${artistNumber}`,
    'is_primary',
    index + 1,
    `https://picsum.photos/seed/primary-${artistNumber}/300/225`
  )
})

const artists = [
  createArtist('alpha-composer', 'Alpha Composer', 'is_composer', 12, 'https://picsum.photos/seed/alpha-composer/300/225'),
  createArtist('beta-performer', 'Beta Performer', 'is_performer', 8, 'https://picsum.photos/seed/beta-performer/300/225'),
  createArtist('bravo-primary', 'Bravo Primary', 'is_primary', 6, 'https://picsum.photos/seed/bravo-primary/300/225'),
  createArtist('broken-portrait-artist', 'Broken Portrait Artist', 'is_primary', 5, 'https://picsum.photos/seed/broken-portrait/300/225'),
  createArtist('missing-portrait-artist', 'Missing Portrait Artist', 'is_primary', 4, null),
  createArtist('mozart-composer', 'Mozart Composer', 'is_composer', 7, 'https://picsum.photos/seed/mozart-composer/300/225'),
  createArtist('retry-recovery-artist', 'Retry Recovery Artist', 'is_primary', 3, 'https://picsum.photos/seed/retry-recovery/300/225'),
  ...primaryArtists
]

const state = {
  requests: [],
  scenarioCounts: new Map()
}

const resetState = () => {
  state.requests = []
  state.scenarioCounts.clear()
}

const sendJson = (response, status, body) => {
  response.writeHead(status, {
    'cache-control': 'no-store',
    'content-type': 'application/json; charset=utf-8'
  })

  response.end(JSON.stringify(body))
}

const logArtistsRequest = (url, status) => {
  state.requests.push({
    pathname: url.pathname,
    searchParams: Object.fromEntries(url.searchParams.entries()),
    status
  })
}

const parsePositiveInteger = (value, fallbackValue) => {
  const parsedValue = Number(value)

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    return fallbackValue
  }

  return parsedValue
}

const filterArtists = ({ letter, search, type }) => {
  let filteredArtists = artists

  if (type) {
    filteredArtists = filteredArtists.filter((artist) => artist.type === type)
  }

  if (search) {
    const normalizedSearch = search.toLowerCase()

    filteredArtists = filteredArtists.filter((artist) => artist.name.toLowerCase().includes(normalizedSearch))
  } else if (letter) {
    filteredArtists = filteredArtists.filter((artist) => artist.name.toUpperCase().startsWith(letter))
  }

  return filteredArtists
}

const buildArtistsResponse = (filteredArtists, page, perPage) => {
  const totalItems = filteredArtists.length
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))
  const startIndex = (page - 1) * perPage
  const pageItems = filteredArtists.slice(startIndex, startIndex + perPage).map((artist) => ({
    albumCount: artist.albumCount,
    id: artist.id,
    name: artist.name,
    portrait: artist.portrait
  }))

  return {
    data: pageItems,
    pagination: {
      current_page: page,
      per_page: perPage,
      total_items: totalItems,
      total_pages: totalPages
    }
  }
}

const getScenarioAttemptCount = (key) => {
  const attemptCount = (state.scenarioCounts.get(key) ?? 0) + 1

  state.scenarioCounts.set(key, attemptCount)

  return attemptCount
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? `${host}:${port}`}`)

  if (requestUrl.pathname === '/__health') {
    sendJson(response, 200, { ok: true })
    return
  }

  if (requestUrl.pathname === '/__admin/reset') {
    if (request.method !== 'POST') {
      sendJson(response, 405, { message: 'Method not allowed.' })
      return
    }

    resetState()
    sendJson(response, 200, { ok: true })
    return
  }

  if (requestUrl.pathname === '/__admin/requests') {
    sendJson(response, 200, { requests: state.requests })
    return
  }

  if (requestUrl.pathname !== '/api/artists') {
    sendJson(response, 404, { message: 'Not found.' })
    return
  }

  const page = parsePositiveInteger(requestUrl.searchParams.get('page'), 1)
  const perPage = parsePositiveInteger(requestUrl.searchParams.get('per_page'), DEFAULT_PER_PAGE)
  const search = requestUrl.searchParams.get('search')?.trim() ?? ''
  const letter = requestUrl.searchParams.get('letter')?.trim().toUpperCase() ?? ''
  const type = requestUrl.searchParams.get('type')?.trim() ?? ''

  if (search === 'server-error') {
    logArtistsRequest(requestUrl, 500)
    sendJson(response, 500, { message: 'Mock server error.' })
    return
  }

  if (search === 'retry-recovery') {
    const attemptCount = getScenarioAttemptCount(search)

    if (attemptCount <= RETRY_FAILURE_COUNT) {
      logArtistsRequest(requestUrl, 500)
      sendJson(response, 500, { message: `Mock retry failure ${attemptCount}.` })
      return
    }

    const retryArtist = artists.filter((artist) => artist.name === 'Retry Recovery Artist')
    const retryResponse = buildArtistsResponse(retryArtist, page, perPage)

    logArtistsRequest(requestUrl, 200)
    sendJson(response, 200, retryResponse)
    return
  }

  if (search === 'empty') {
    const emptyResponse = buildArtistsResponse([], page, perPage)

    logArtistsRequest(requestUrl, 200)
    sendJson(response, 200, emptyResponse)
    return
  }

  const filteredArtists = filterArtists({ letter, search, type })
  const artistsResponse = buildArtistsResponse(filteredArtists, page, perPage)

  logArtistsRequest(requestUrl, 200)
  sendJson(response, 200, artistsResponse)
})

server.listen(port, host, () => {
  console.log(`[mock-artists-api] listening on http://${host}:${port}`)
})
