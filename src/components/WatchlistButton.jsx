import { useWatchlist } from "../hooks";

function WatchlistButton({ movie, showLabel = false }) {
  const { add, remove, isSaved } = useWatchlist();
  const saved = isSaved(movie.id);

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (saved) {
      remove(movie.id);
    } else {
      add(movie);
    }
  }

  const cardClasses = saved
    ? "bg-primary-800 text-white"
    : "bg-white text-slate-800 dark:bg-slate-900 dark:text-white";
  const detailClasses = saved
    ? "bg-primary-800 text-white hover:bg-primary-950"
    : "border border-white bg-white/10 text-white hover:bg-white/20";

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={
        saved
          ? `Remove ${movie.title} from watchlist`
          : `Add ${movie.title} to watchlist`
      }
      onClick={handleClick}
      className={
        showLabel
          ? `inline-flex items-center gap-2 rounded-base px-4 py-2 text-sm font-medium ${detailClasses}`
          : `absolute top-3 end-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-md ${cardClasses}`
      }
    >
      <svg
        className="h-5 w-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
      {showLabel && <span>{saved ? "Saved" : "Add to watchlist"}</span>}
    </button>
  );
}

export default WatchlistButton;
