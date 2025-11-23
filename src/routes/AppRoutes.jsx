import React from "react";
import { Route, Routes } from "react-router-dom";
import { MovieDetailPage, MoviesPage, PageNotFound } from "../pages";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<MoviesPage key="now_playing" partUrl="now_playing" />}
      />
      <Route
        path="/popular"
        element={<MoviesPage key="popular" partUrl="popular" />}
      />
      <Route
        path="/upcoming"
        element={<MoviesPage key="upcoming" partUrl="upcoming" />}
      />
      <Route
        path="/top_rated"
        element={<MoviesPage key="top_rated" partUrl="top_rated" />}
      />
      <Route path="/movies/:id" element={<MovieDetailPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
