import { useEffect, useState } from "react";

const STORAGE_KEY = "filmfiesta-watchlist";
const CHANGE_EVENT = "filmfiesta-watchlist-change";

function readWatchlist() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function publish(movies) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function toSavedMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path ?? null,
    vote_average: movie.vote_average ?? null,
    release_date: movie.release_date ?? null,
  };
}

function sameId(movie, id) {
  return String(movie.id) === String(id);
}

function useWatchlist() {
  const [movies, setMovies] = useState(readWatchlist);

  useEffect(() => {
    function sync() {
      setMovies(readWatchlist());
    }

    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function add(movie) {
    if (movie?.id == null) return;

    const current = readWatchlist();
    if (current.some((item) => sameId(item, movie.id))) return;

    publish([...current, toSavedMovie(movie)]);
  }

  function remove(id) {
    publish(readWatchlist().filter((item) => !sameId(item, id)));
  }

  function isSaved(id) {
    return movies.some((item) => sameId(item, id));
  }

  return { movies, add, remove, isSaved };
}

export default useWatchlist;
