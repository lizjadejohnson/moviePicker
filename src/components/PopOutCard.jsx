import React from 'react';

const PopOutCard = ({ movie, toggle}) => {
  const urlString = `https://www.themoviedb.org/movie/${movie.id}`;

  return (
    <div className='popOutCard'>
      <h3 className='movieTitle'>{movie.title}</h3>
      <img className="coverArt" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average.toFixed(1)}/10</p>
      <a href={urlString} target="_blank">Visit TMDB</a>
      <button onClick={toggle}>Close</button>
    </div>
  );
};

export default PopOutCard;
