import React, { useState } from 'react';
import MovieCard from './MovieCard';
import PopOutCard from './PopOutCard';

// For each movie in the movie list, pass the individual movie's data and get a card component for each movie.
const MoviesContainer = ({ movies }) => {

    //Controls the state for which movie is currently active (shows a popup on click)
  const [activeMovieId, setActiveMovieId] = useState(null);

    // Function to handle the click event on a movie card
  // It toggles the active state of the clicked movie
  const handleCardClick = (movieId) => {
    setActiveMovieId(activeMovieId === movieId ? null : movieId); // Toggle active state
  };

  return (
    <div className='moviesContainer'>
      {movies.map((movie) => (
        <div key={movie.id}>
          {/* MovieCard component displays the movie details and handles click events */}
          <MovieCard
            movie={movie}
            onClick={() => handleCardClick(movie.id)}
            isActive={activeMovieId === movie.id}
          />
          {/* If the current movie is the active one, conditionally render the PopOutCard and pass in the movie that should be displayed */}
          {activeMovieId === movie.id && (
            <>
              <div className='overlay' onClick={() => setActiveMovieId(null)} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundRepeat: 'no-repeat' }}></div>
              <PopOutCard movie={movie} toggle={() => setActiveMovieId(null)} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MoviesContainer;
