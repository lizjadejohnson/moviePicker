import { useState, useEffect, useRef } from 'react'
import './App.css'
import MoviesContainer from './components/MoviesContainer'
import SubmissionForm from './components/SubmissionForm'
import Button from './components/Button'
import NoResult from './components/NoResult'

const apiKey = import.meta.env.VITE_API_KEY

function App() {

  // State to hold movie data fetched from the OMDB API:
  const [movies, setMovies] = useState([]);

  //State to hold our search term:
  const [searchTerm, setSearchTerm] = useState('');

  //Initializing our ref:
  const inputRef = useRef(null);


  ////////  Function to actually get movies from TMDB using a search term  ////////////////
  const getMovies = async (searchTerm) => {
    const getKeywordIDs = async (searchTerm) => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      };

      const response = await fetch(
        `https://api.themoviedb.org/3/search/keyword?query=${searchTerm}&page=1`,
        options
      );
      const data = await response.json();
      console.log("Keyword search results:", data.results); // Debugging log
        
      return data.results.map(result => result.id);
    };

    try {
      const keywordIDs = await getKeywordIDs(searchTerm);
      if (keywordIDs.length === 0) {
        //If there are no valid results, return an empty string
        setMovies([]);
        return;
      }
      //Otherwise join in an or string
      const keywordIDsString = keywordIDs.join("|");

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      };

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=3&sort_by=popularity.desc&vote_average.gte=6&vote_count.gte=80&with_keywords=${keywordIDsString}`,
        options
      );
      const data = await response.json();
      console.log("Movie search results:", data.results); // Debugging log
      
      if (data.results.length >= 9) {
        const shuffled = data.results.sort(() => 0.5 - Math.random());
        const selectedMovies = shuffled.slice(0, 9);
        setMovies(selectedMovies);
      } else {
        setMovies(data.results);
      }
    } catch (err) {
      console.error(err);
    }
  };
    //Function to handle our useRef keyword search/form input:
    const handleSearch = () => {
      const term = inputRef.current.value;
      //Sets the searchTerm state with the submitted term from form:
      setSearchTerm(term);
      //Runs the getMovies function with the term
      getMovies(term);
    };

    //Function to handle the shuffle movie button
    const shuffleMovies = () => {
      getMovies(searchTerm); // Re-fetches movies using the current search term, will result in generating 9 new random movies with same term
    };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Setting up a useEffect to have an inquiry run once upon render--
  // This will run on the first render but not on subsquent renders (because of the empty dependencies list)
  useEffect(() => {
    getMovies("computer");
  }, [
    // empty list of dependencies here means this runs only once!
  ]);

  return (
    <div className="App">
      <h1 className='siteTitle'>IN THE MOOD FOR...</h1>
      <SubmissionForm handleSearch={handleSearch} inputRef={inputRef} />
      <MoviesContainer movies={movies} />

      {/* Conditional render: If the movies list is NOT empty, show the shuffle button. Otherwise show the NoResult component: */}
      {movies.length > 0 ? (
        <Button shuffleMovies={shuffleMovies} buttonName={"🎲Shuffle🎲"} />
      ) : (
        <NoResult />
      )}

    </div>
  );
}

export default App
