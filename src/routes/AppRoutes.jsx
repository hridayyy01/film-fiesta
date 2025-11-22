import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MovieDetailPage, MoviesPage, PageNotFound } from '../pages'

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element ={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
        <Route path="*" element ={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoutes