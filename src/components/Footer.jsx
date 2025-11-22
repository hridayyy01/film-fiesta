import React from "react";

function Footer() {
  return (
    <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-neutral-primary-soft border-t border-default shadow-sm flex">
      <p className="text-sm w-full text-center">
        &copy; {new Date().getFullYear()} &nbsp;
        <a href="https://flowbite.com/" class="hover:underline">
          FilmFiesta&trade;
        </a>
        &nbsp; | All Right Reserved.
      </p>
    </footer>
  );
}

export default Footer;
