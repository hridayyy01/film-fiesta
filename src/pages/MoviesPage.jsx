import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieCard, Skeletons } from "../components";
import { useFetch } from "../hooks";

function createSkeletons(nums = 3) {
  const skeletons = [];

  for (let i = 0; i < nums; i++) {
    skeletons.push(<Skeletons key={i} />);
  }

  return skeletons;
}

function MoviesPage({ partUrl }) {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q")?.trim() || "";

  return (
    <MoviesGrid
      key={`${partUrl || "search"}-${searchTerm}`}
      partUrl={partUrl}
      searchTerm={searchTerm}
    />
  );
}

function MoviesGrid({ partUrl, searchTerm }) {
  const [page, setPage] = useState(1);
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const hasConfig = Boolean(BASE_URL && API_KEY);

  const url = useMemo(() => {
    if (!hasConfig) return "";

    if (searchTerm) {
      return `${BASE_URL}/search/movie?page=${page}&query=${encodeURIComponent(
        searchTerm
      )}&api_key=${API_KEY}`;
    }

    if (partUrl) {
      return `${BASE_URL}/movie/${partUrl}?page=${page}&api_key=${API_KEY}`;
    }

    return "";
  }, [API_KEY, BASE_URL, hasConfig, page, partUrl, searchTerm]);

  const { data, isLoading, error } = useFetch(url);
  const movies = data?.results || [];
  const totalPages = Math.min(data?.total_pages || 1, 500);
  const heading = searchTerm
    ? `Search results for "${searchTerm}"`
    : partUrl?.replace("_", " ") || "Movies";

  function handlePreviousPage() {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function handleNextPage() {
    setPage((currentPage) => Math.min(currentPage + 1, totalPages));
  }

  return (
    <div className="container">
      <div className="flex flex-col gap-3 py-4 text-center">
        <h1 className="text-3xl font-bold capitalize text-heading dark:text-white">
          {heading}
        </h1>
        {data?.total_results !== undefined && (
          <p className="text-body dark:text-white">
            {data.total_results.toLocaleString()} movies found
          </p>
        )}
      </div>

      {error && (
        <p className="my-8 rounded-base bg-red-100 px-4 py-3 text-center text-red-800">
          Could not load movies: {error.msg}
        </p>
      )}

      {!hasConfig && (
        <p className="my-8 rounded-base bg-red-100 px-4 py-3 text-center text-red-800">
          Add your TMDB base URL and API key to the project environment.
        </p>
      )}

      {hasConfig && !url && (
        <p className="my-8 text-center text-body dark:text-white">
          Search for a movie to get started.
        </p>
      )}

      <div className="flex flex-wrap justify-center max-sm:flex-col">
        {isLoading && createSkeletons(8)}
        {!isLoading &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {!isLoading && !error && url && movies.length === 0 && (
        <p className="my-8 text-center text-body dark:text-white">
          No movies found.
        </p>
      )}

      {!isLoading && !error && movies.length > 0 && (
        <div className="flex items-center justify-center gap-4 py-8">
          <button
            type="button"
            className="rounded-base bg-primary-800 px-4 py-2 text-sm font-medium text-white hover:bg-primary-950 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-sm font-medium text-heading dark:text-white">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="rounded-base bg-primary-800 px-4 py-2 text-sm font-medium text-white hover:bg-primary-950 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default MoviesPage;
