export const enDictionary = {
  metadata: {
    title: 'Hungaroton Artist List',
    description: 'Browse artists from the Hungaroton catalogue.'
  },
  common: {
    loading: 'Loading...',
    retry: 'Try again'
  },
  artistSearch: {
    title: 'Hungaroton artists',
    subtitle: 'Browse artists from the Hungaroton catalogue.',
    searchLabel: 'Search artist',
    searchPlaceholder: 'Type an artist name...',
    searchButton: 'Search',
    clearButton: 'Clear',
    letterFilterLabel: 'Filter by letter',
    typeFilterLabel: 'Filter by artist type',
    resetFiltersButton: 'Reset filters',
    pageLabel: 'Page',
    allArtistTypesLabel: 'All artist types',
    activeFilterLabels: {
      search: 'Search',
      letter: 'Letter',
      type: 'Type'
    },
    artistTypeLabels: {
      is_composer: 'Composers',
      is_performer: 'Performers',
      is_primary: 'Primary artists'
    }
  },
  artistResults: {
    emptyTitle: 'No artists found',
    emptyDescription: 'No artists found for the current filters.',
    errorTitle: 'Something went wrong',
    errorDescription: 'Unable to load artists. Please try again.',
    imageAlt: (name: string) => `${name} portrait`,
    imageFallbackLabel: (name: string) => `No portrait available for ${name}`,
    // Note: pluralization will be handled better with i18n or similar libraries
    totalArtists: (count: number) => `${count} ${count === 1 ? 'artist' : 'artists'}`,
    paginationSummary: (currentPage: number, totalPages: number) => `Showing page ${currentPage} of ${totalPages}.`,
    albumCount: (count: number) => `${count} ${count === 1 ? 'album' : 'albums'}`
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
    page: 'Page'
  }
} as const;
