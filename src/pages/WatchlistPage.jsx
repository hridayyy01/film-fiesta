import { Link } from "react-router-dom";
import { MovieCard } from "../components";
import { useWatchlist } from "../hooks";

function WatchlistPage() {
  const { movies } = useWatchlist();

  return (
    <div className="container">
      <div className="flex flex-col gap-3 py-4 text-center">
        <h1 className="text-3xl font-bold text-heading dark:text-white">
          Watchlist
        </h1>
        <p className="text-body dark:text-white">
          {movies.length} {movies.length === 1 ? "movie" : "movies"} saved
        </p>
      </div>

      {movies.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-center">
          <p className="text-body dark:text-white">
            Your watchlist is empty.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-base bg-primary-800 px-4 py-2 text-sm font-medium text-white hover:bg-primary-950"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center max-sm:flex-col">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistPage;
