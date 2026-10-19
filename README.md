# FilmFiesta

FilmFiesta is a movie browser built with React and Vite that loads films from TMDB. It includes a dark mode toggle and a watchlist saved in the browser.

## Features

- Now playing, popular, top rated, and upcoming movie lists
- Home hero banner for now playing, with backdrop, title, year, rating, a short overview, and a link to the movie
- Search from the header
- Pagination on movie lists
- Movie detail page with poster, backdrop, rating, runtime, genres, overview, a trailer link, cast, and similar movies
- Watchlist saved in the browser, with a heart toggle on cards and the detail page
- Dark mode
- Loading skeletons and error states
- 404 page with a link back to Home

## Tech stack

- React 19
- Vite
- React Router
- Tailwind CSS
- Flowbite
- TMDB API

## Getting started

Node.js is required.

```bash
npm install
cp .env.example .env
```

Set `VITE_TMDB_API_KEY` in `.env` to a key from [TMDB API settings](https://www.themoviedb.org/settings/api). Leave `VITE_TMDB_BASE_URL` as `https://api.themoviedb.org/3`.

```bash
npm run dev
```

## Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| dev | `npm run dev` | Start the Vite development server |
| build | `npm run build` | Build the production bundle |
| preview | `npm run preview` | Preview the production build locally |
| lint | `npm run lint` | Run ESLint |

## Routes

| Path | Page |
| --- | --- |
| `/` | Now playing, including the hero banner |
| `/popular` | Popular movies |
| `/top_rated` | Top rated movies |
| `/upcoming` | Upcoming movies |
| `/search` | Search results for the `q` query |
| `/movies/:id` | Movie detail |
| `/watchlist` | Saved movies |
| Any other path | 404 page |

## Local storage

The watchlist is stored under `filmfiesta-watchlist`, and the theme is stored under `darkMode`. Both stay in `localStorage` in the browser. `.env` is gitignored, so the TMDB API key must not be committed.
