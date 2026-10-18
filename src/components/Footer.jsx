import React from "react";

function Footer() {
  return (
    <footer className="mt-auto w-full p-4 bg-neutral-primary-soft border-default shadow-sm flex dark:bg-slate-900 dark:text-white">
      <p className="text-sm w-full text-center">
        &copy; {new Date().getFullYear()} &nbsp;
        <a href="https://flowbite.com/" className="hover:underline">
          FilmFiesta&trade;
        </a>
        &nbsp; | All Right Reserved.
      </p>
    </footer>
  );
}

export default Footer;
