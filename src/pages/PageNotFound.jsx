import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <section className="container flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-4xl font-bold text-primary-800">404</h1>
      <p className="mt-4 text-xl font-semibold text-heading dark:text-white">
        We could not find that page.
      </p>
      <p className="mt-3 max-w-md text-body dark:text-white">
        The address may be mistyped, or the page may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-base bg-primary-800 px-4 py-2 text-sm font-medium text-white hover:bg-primary-950"
      >
        Back to Home
      </Link>
    </section>
  );
}

export default PageNotFound;
