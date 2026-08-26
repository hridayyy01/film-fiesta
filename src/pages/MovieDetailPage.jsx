import { Link, useParams } from "react-router-dom";
import { MovieCard, Skeletons } from "../components";
import { useFetch } from "../hooks";

function MovieDetailPage() {
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const url =
    BASE_URL && API_KEY
      ? `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,similar`
      : "";
  const { data: movie, isLoading, error } = useFetch(url);

  const backdropURL = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    : "";
  const posterURL = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "https://placehold.co/500x750/0f172a/f8fafc?text=No+Poster";
  const trailer = movie?.videos?.results?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
  const cast = movie?.credits?.cast?.slice(0, 8) || [];
  const similarMovies = movie?.similar?.results?.slice(0, 4) || [];

  if (isLoading) {
    return (
      <div className="container flex flex-wrap justify-center max-sm:flex-col">
        <Skeletons />
        <Skeletons />
        <Skeletons />
      </div>
    );
  }

  if (!url) {
    return (
      <div className="container">
        <p className="my-8 rounded-base bg-red-100 px-4 py-3 text-center text-red-800">
          Add your TMDB base URL and API key to the project environment.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="my-8 rounded-base bg-red-100 px-4 py-3 text-center text-red-800">
          Could not load this movie: {error.msg}
        </p>
      </div>
    );
  }

  if (!movie) return null;

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "Runtime unavailable";
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Release date unavailable";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div className="dark:bg-slate-700">
      <section
        className="bg-slate-950 bg-cover bg-center text-white"
        style={{
          backgroundImage: backdropURL
            ? `linear-gradient(90deg, rgba(15,23,42,0.95), rgba(15,23,42,0.72)), url(${backdropURL})`
            : undefined,
        }}
      >
        <div className="container grid gap-8 py-10 md:grid-cols-[280px_1fr] md:items-start">
          <img
            src={posterURL}
            alt={movie.title}
            className="mx-auto aspect-[2/3] w-full max-w-[280px] rounded-base object-cover shadow-2xl"
          />
          <div>
            <Link
              to="/"
              className="mb-4 inline-flex text-sm font-medium text-primary-200 hover:text-primary-100"
            >
              Back to movies
            </Link>
            <h1 className="mb-3 text-4xl font-bold">{movie.title}</h1>
            {movie.tagline && (
              <p className="mb-5 text-lg italic text-primary-100">
                {movie.tagline}
              </p>
            )}
            <div className="mb-5 flex flex-wrap gap-3 text-sm font-medium">
              <span className="rounded-base bg-primary-800 px-3 py-1">
                {rating}/10
              </span>
              <span className="rounded-base bg-slate-800 px-3 py-1">
                {releaseYear}
              </span>
              <span className="rounded-base bg-slate-800 px-3 py-1">
                {runtime}
              </span>
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-primary-200 px-3 py-1 text-sm text-primary-100"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="max-w-3xl text-base leading-7 text-slate-100">
              {movie.overview || "No overview is available for this movie yet."}
            </p>
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-base bg-primary-800 px-4 py-2 text-sm font-medium text-white hover:bg-primary-950"
              >
                Watch trailer
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="container py-8">
        <h2 className="mb-4 text-2xl font-bold text-heading dark:text-white">
          Cast
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cast.map((person) => (
            <div
              key={person.id}
              className="rounded-base bg-neutral-secondary-medium p-4 dark:bg-slate-900"
            >
              <p className="font-semibold text-heading dark:text-white">
                {person.name}
              </p>
              <p className="text-sm text-body dark:text-slate-200">
                {person.character}
              </p>
            </div>
          ))}
        </div>
      </section>

      {similarMovies.length > 0 && (
        <section className="container pb-10">
          <h2 className="mb-4 text-2xl font-bold text-heading dark:text-white">
            Similar Movies
          </h2>
          <div className="flex flex-wrap justify-center max-sm:flex-col">
            {similarMovies.map((similarMovie) => (
              <MovieCard key={similarMovie.id} movie={similarMovie} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default MovieDetailPage;
