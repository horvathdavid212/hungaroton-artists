# Hungaroton Artists

Live demo: https://hungaroton-artists.vercel.app/

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file and set the API URL:

```env
ARTISTS_API_URL=<artists-api-url>
```

You can also copy `.env.example` and edit it.

3. Start the development server:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Tech Stack

- Next.js
- React
- TypeScript
- MUI
- next-intl
- Zod
- Playwright

## Important Directories

- `src/app` - app routes and page entry points
- `src/features` - feature-specific UI, API, and utilities
- `src/shared` - shared reusable components
- `src/theme` - MUI theme setup
- `translations` - translation files
- `tests` - Playwright tests and mock API server

## Playwright Tests

Run the end-to-end tests with:

```bash
npm run test:e2e
```

If Playwright browsers are not installed yet:

```bash
npx playwright install chromium
```

## Production

```bash
npm run build
npm start
```
