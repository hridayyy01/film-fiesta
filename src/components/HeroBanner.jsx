import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function trimOverview(overview) {
  const text = (overview || "No overview is available for this movie yet.")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= 140) return text;
  return `${text.slice(0, 137).trimEnd()}...`;
}

function HeroBanner({ movies, isLoading }) {
  const slides = movies.filter((movie) => movie.backdrop_path).slice(0, 5);
  const slideKey = slides.map((movie) => movie.id).join("-");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const safeIndex = slides.length ? index % slides.length : 0;

  useEffect(() => {
    setIndex(0);
  }, [slideKey]);

  useEffect(() => {
    if (paused || slides.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [paused, slides.length, index]);

  if (isLoading) {
    return (
      <div
        role="status"
        className="mb-6 h-56 animate-pulse rounded-base bg-neutral-quaternary sm:h-80 lg:h-[28rem]"
      >
        <span className="sr-only">Loading featured movies</span>
      </div>
    );
  }

  if (slides.length === 0) return null;

  const movie = slides[safeIndex];
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Release date unavailable";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  function showPrevious() {
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  }

  function showNext() {
    setIndex((current) => (current + 1) % slides.length);
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured movies"
      className="relative mb-6 h-56 overflow-hidden rounded-base sm:h-80 lg:h-[28rem]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/25" />

      <div className="relative z-10 flex h-full min-w-0 flex-col justify-end overflow-hidden px-12 pb-8 pt-4 sm:px-16 sm:pb-10">
        <h2 className="line-clamp-1 text-xl font-bold text-white sm:line-clamp-2 sm:text-4xl">
          {movie.title}
        </h2>
        <p className="mt-1 text-xs font-medium text-white sm:mt-2 sm:text-sm">
          {year} · {rating}/10
        </p>
        <p className="mt-1 line-clamp-1 max-w-3xl text-xs text-slate-100 sm:mt-2 sm:text-base">
          {trimOverview(movie.overview)}
        </p>
        <Link
          to={`/movies/${movie.id}`}
          className="mt-3 inline-flex w-fit rounded-base bg-primary-800 px-4 py-2 text-xs font-medium text-white hover:bg-primary-950 sm:text-sm"
        >
          View details
        </Link>
      </div>

      <button
        type="button"
        aria-label="Previous featured movie"
        className="absolute start-2 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/70 text-white hover:bg-primary-800 sm:h-11 sm:w-11"
        onClick={showPrevious}
      >
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m15 19-7-7 7-7"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next featured movie"
        className="absolute end-2 top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/70 text-white hover:bg-primary-800 sm:h-11 sm:w-11"
        onClick={showNext}
      >
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 5 7 7-7 7"
          />
        </svg>
      </button>

      <div className="absolute bottom-2 left-0 right-0 z-20 flex items-center justify-center">
        {slides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.title}`}
            aria-current={slideIndex === safeIndex ? "true" : undefined}
            className="inline-flex h-8 w-8 items-center justify-center"
            onClick={() => setIndex(slideIndex)}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                slideIndex === safeIndex ? "bg-primary-800" : "bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

export default HeroBanner;
