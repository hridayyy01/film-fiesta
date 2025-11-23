import React from "react";

function MovieCard({ movie }) {
  const movieDescription =
    movie.overview.length > 150
      ? `${movie.overview.substr(0, 150)}...`
      : movie.overview;
  return (
    <div className="dark:bg-slate-900 max-w-sm shadow-2xl shadow-primary-800/75 rounded-base shadow-xs m-4 mx-auto hover:scale-[1.02] ease-in-out duration-300">
      <a href="#">
        <img
          className="rounded-base"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt=""
        />
      </a>
      <div className="p-6">
        <a href="#">
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-heading dark:text-white capitalize">
            {movie.title}
          </h5>
        </a>
        <p className="mb-6 text-body dark:text-white">{movieDescription}</p>
        <a
          href="#"
          className="inline-flex items-center text-body bg-neutral-secondary-medium box-border shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none bg-primary-800 text-white
        hover:bg-primary-950 hover:text-primary-100 capitalize"
        >
          Read more
          <svg
            className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default MovieCard;
