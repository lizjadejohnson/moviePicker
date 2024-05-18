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

  //Initializing our ref for the form:
  const inputRef = useRef(null);


  ////////  Function to actually get movies from TMDB using a search term  ////////////////
  const getMovies = async (searchTerm) => {
    //Info needed for forming API requests:
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      }
    }
    //We have 2 things going on here, first is finding relevant keywords, and then the second is finding movies that match with those keywords.

    //Part 1: Function to take our searchTerm state (which is currently a search term string) and use it to get relevant keyword IDs
    //Necessary because the API doesn't let us search for movies using keywords as strings directly, we have to figure out the keyword IDs first
    const getKeywordIDs = async (searchTerm) => {

      const response = await fetch(
        `https://api.themoviedb.org/3/search/keyword?query=${searchTerm}&page=1`,
        options
      );
      const data = await response.json();
      console.log("Keyword search results:", data.results); // Logs the keyword search results
      //Returns the keyword IDs of the results
      return data.results.map(result => result.id);
    };

    //Try to store the results of the above getKeywordIDs function as a variable.
    //If there are no results, use the setMovies ability to set Movies as an empty array.
    try {
      const keywordIDs = await getKeywordIDs(searchTerm);
      if (keywordIDs.length === 0) {
        //If there are no valid results, return an empty string
        setMovies([]);
        return;
      }
      //Otherwise join all keywords together in an "or" string so that we can use this to find movies that match any of the relevant keywords.
      const keywordIDsString = keywordIDs.join("|");

      //Part 2: Using those keywords to actually find matching movies:
      //The vote_average.gte=6 means it must have a score of at least 6/10
      //The vote_count.gte=80 means it must have at least 80 reviews
      //The keywordIDsString is of course all our keyword IDs connect by or's | in string format.
      //Again, we pass in the required options as well to the API request.
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=3&sort_by=popularity.desc&vote_average.gte=6&vote_count.gte=80&with_keywords=${keywordIDsString}`,
        options
      );
      const data = await response.json();
      console.log("Movie search results:", data.results); // Prints the movie results to console
      
      //If there are more than 9 results, use random to select 9 random ones to display
      //Set the resulting list to our Movies state with setMovies
      if (data.results.length >= 9) {
        const shuffled = data.results.sort(() => 0.5 - Math.random());
        const selectedMovies = shuffled.slice(0, 9);
        setMovies(selectedMovies);
      } else {
        //Otherwise just store the results if randomizing is not required:
        setMovies(data.results);
      }
    } catch (err) {
      console.error(err);
    }
  };
    //Function to handle our useRef keyword search/form input:
    const handleSearch = () => {
      const term = inputRef.current.value;
      //Sets the searchTerm state to be the submitted term from our form:
      setSearchTerm(term);
      //Calls the getMovies function with the term. handleSearch is run on submit of our search button
      getMovies(term);
    };

    //Function to handle the shuffle movie button
    const shuffleMovies = () => {
      getMovies(searchTerm); // Re-fetches movies using the current search term (which will result in generating 9 new random movies with same term)
    };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //Setting up a useEffect to have an inquiry run once upon render--
  // This will run on the first render but not on subsquent renders (because of the empty dependencies list)
  useEffect(() => {
    setSearchTerm("computer")
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