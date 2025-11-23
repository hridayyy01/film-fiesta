import React from 'react'
import { MovieCard, Skeletons } from '../components'
import { useFetch } from '../hooks';

function createSkeletons(nums=3) {
  const skeletons = [];

  for(let i=0; i<nums; i++) {
    skeletons.push(<Skeletons key={i}/>);
  }

  return skeletons;
}


function MoviesPage({partUrl}) {
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const {data,error,isLoading,setUrl} = useFetch(`${BASE_URL}/movie/${partUrl}?page=1&api_key=${API_KEY}`);
  console.log(data);
  return (
    <div className="container flex flex-wrap justify-center max-sm:flex-col">
      {
        isLoading && createSkeletons(8)
      }
      {
        data && data.results.map(movie => <MovieCard key = {movie.id} movie={movie}/>)
      }
    </div>
  )
}

export default MoviesPage