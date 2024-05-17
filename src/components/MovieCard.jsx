import React from 'react'

const MovieCard = ({movie}) => {
  return (
    <div className='movieCard'>
      <h3>{movie.title}</h3>
      <img className="coverArt" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average.toFixed(1)}/10</p>
    </div>
  )
}

export default MovieCard
