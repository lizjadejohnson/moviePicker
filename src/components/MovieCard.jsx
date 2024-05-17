import React from 'react';
import PropTypes from 'prop-types';

// Using the individual movie data passed from MoviesContainer,
// Give us the title, cover art, description, and rating.
const MovieCard = ({ movie, onClick, isActive }) => {
  return (
    <div className={`movieCard ${isActive ? 'active' : ''}`} onClick={onClick}>
      <img className="coverArt" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
      <h3 className='movieTitle'>{movie.title}</h3>
      {/* <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average.toFixed(1)}/10</p> */}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default MovieCard;
