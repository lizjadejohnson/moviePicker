import React from 'react'
import MovieCard from './MovieCard'

const MoviesContainer = ({ movies }) => {
  return (
    <div className='moviesContainer'>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}

export default MoviesContainer
