import React from 'react'
import MovieCard from '../components/MovieCard'
import { useFetch } from '../hooks';

function MoviesPage() {
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const {data,error,isLoading,setUrl} = useFetch(`${BASE_URL}/movie/now_playing?page=1&api_key=${API_KEY}`);
  console.log(data);
  return (
    <div className="container flex flex-wrap justify-center max-sm:flex-col">
      {
        data && data.results.map(movie => <MovieCard key = {movie.id} movie={movie}/>)
      }
    </div>
  )
}

export default MoviesPage