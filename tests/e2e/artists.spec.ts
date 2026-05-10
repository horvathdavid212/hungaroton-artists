import { expect, test, type APIRequestContext } from '@playwright/test'

const mockAdminUrl = 'http://127.0.0.1:3101/__admin'

type MockArtistsRequest = {
  pathname: string
  searchParams: Record<string, string>
  status: number
}

const resetMockState = async (request: APIRequestContext) => {
  const response = await request.post(`${mockAdminUrl}/reset`)

  expect(response.ok()).toBeTruthy()
}

const getMockRequests = async (request: APIRequestContext) => {
  const response = await request.get(`${mockAdminUrl}/requests`)

  expect(response.ok()).toBeTruthy()

  return (await response.json()) as { requests: MockArtistsRequest[] }
}

test.beforeEach(async ({ request }) => {
  await resetMockState(request)
})

test('renders the initial list with the API pagination defaults', async ({ page, request }) => {
  await page.goto('/en?page=1')

  await expect(page.getByRole('heading', { name: 'Hungaroton artists' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '61 artists' })).toBeVisible()
  await expect(page.locator('article')).toHaveCount(50)

  const { requests } = await getMockRequests(request)

  expect(requests).toHaveLength(1)
  expect(requests[0]).toMatchObject({
    pathname: '/api/artists',
    searchParams: {
      include_image: 'true',
      page: '1',
      per_page: '50'
    },
    status: 200
  })
})

test('syncs the search input to the URL and clears the letter filter', async ({ page }) => {
  await page.goto('/en?page=2&letter=B&type=is_composer')

  await page.getByRole('textbox', { name: 'Search artist' }).fill('Mozart')
  await page.getByRole('button', { name: 'Search' }).click()

  await expect(page).toHaveURL(/\/en\?page=1&search=Mozart&type=is_composer$/)
  await expect(page.getByRole('heading', { name: '1 artist' })).toBeVisible()
  await expect(page.getByText('Mozart Composer')).toBeVisible()
})

test('syncs the letter filter to the URL and clears the search query', async ({ page }) => {
  await page.goto('/en?page=2&search=Missing&type=is_primary')

  await page.getByRole('button', { name: 'Filter by letter: B' }).click()

  await expect(page).toHaveURL(/\/en\?page=1&letter=B&type=is_primary$/)
  await expect(page.getByText('Bravo Primary')).toBeVisible()
  await expect(page.getByText('Broken Portrait Artist')).toBeVisible()
})

test('syncs the artist type filter to the URL and preserves the current letter', async ({ page }) => {
  await page.goto('/en?page=2&letter=B')

  await page.getByRole('combobox', { name: 'Filter by artist type' }).click()
  await page.getByRole('option', { name: 'Primary artists' }).click()

  await expect(page).toHaveURL(/\/en\?page=1&letter=B&type=is_primary$/)
  await expect(page.getByText('Bravo Primary')).toBeVisible()
  await expect(page.getByText('Broken Portrait Artist')).toBeVisible()
})

test('resets all filters back to the first page', async ({ page }) => {
  await page.goto('/en?page=2&letter=B&type=is_primary')

  await page.locator('#artist-filter-content').getByRole('button', { name: 'Reset filters' }).click()

  await expect(page).toHaveURL(/\/en\?page=1$/)
  await expect(page.getByRole('heading', { name: '61 artists' })).toBeVisible()
  await expect(page.locator('article')).toHaveCount(50)
})

test('syncs pagination to the URL while preserving filters', async ({ page }) => {
  await page.goto('/en?page=1&type=is_primary')

  await page.getByRole('button', { name: 'Page 2' }).click()

  await expect(page).toHaveURL(/\/en\?page=2&type=is_primary$/)
  await expect(page.getByText('Primary Artist 47')).toBeVisible()
  await expect(page.getByText('Primary Artist 54')).toBeVisible()
})

test('renders the empty state for mocked empty responses', async ({ page }) => {
  await page.goto('/en?page=1&search=empty')

  await expect(page.getByRole('heading', { name: 'No artists found' })).toBeVisible()
  await expect(page.getByText('No artists found for the current filters.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Reset filters' }).last()).toBeEnabled()
})

test('renders the error state after mocked server failures', async ({ page, request }) => {
  await page.goto('/en?page=1&search=server-error')

  await expect(page.getByRole('heading', { name: 'Something went wrong' })).toBeVisible()
  await expect(page.getByText('Unable to load artists. Please try again.')).toBeVisible()

  const { requests } = await getMockRequests(request)
  const failedRequests = requests.filter((mockRequest) => mockRequest.searchParams.search === 'server-error')

  expect(failedRequests.length).toBeGreaterThan(0)
  expect(failedRequests.every((mockRequest) => mockRequest.status === 500)).toBeTruthy()
})

test('retries the failed request when the user clicks Try again', async ({ page, request }) => {
  await page.goto('/en?page=1&search=retry-recovery')

  await expect(page.getByRole('heading', { name: 'Something went wrong' })).toBeVisible()

  const retryButton = page.getByRole('button', { name: /Try again/i })

  await retryButton.click()

  await expect(page.getByText('Retry Recovery Artist')).toBeVisible()

  const { requests } = await getMockRequests(request)
  const retryRequests = requests.filter((mockRequest) => mockRequest.searchParams.search === 'retry-recovery')

  expect(retryRequests.some((mockRequest) => mockRequest.status === 500)).toBeTruthy()
  expect(retryRequests.some((mockRequest) => mockRequest.status === 200)).toBeTruthy()
})

test('renders the fallback image when the portrait is missing', async ({ page }) => {
  await page.goto('/en?page=1&search=missing')

  await expect(page.getByRole('img', { name: 'No portrait available for Missing Portrait Artist' })).toBeVisible()
})
