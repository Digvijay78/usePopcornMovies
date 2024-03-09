import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { useEffect, useState } from 'react';
import Search from './components/Search';
import NumResult from './components/NumResult';
import ListBox from './components/ListBox';
import WatchedBox from './components/WatchedBox';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedMoviesList from './components/WatchedMoviesList';
import Loader from './components/Loader';
import Error from './components/Error';


function App() {
  const KEY = "f84fc31d";
  
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
 
  const query = "vnvbn";

   useEffect(function () {
     
     async function fetchingMovies(){
      setIsLoading(true)
      
      try {

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        
        if(!res.ok){
          throw new Error("Something went wrong! Kindly check your internet connection");
        }

        
        const data = await res.json();
        
        if(data.Response === "False") {
          throw new Error("Movie not Found")
          
          
        }
        
        setMovies(data.Search);

      } catch(err){
        // console.log(err.message);
        setError(err.message);
        

      } finally{
        setIsLoading(false)
      }
      
    }
    fetchingMovies()
  }, [])
     
  
  return (
    <>
        <Navbar>
         <Search />
         <NumResult movies={movies} />
      </Navbar>

      <Main>
       <ListBox>
         {/* { isLoading ? <Loader /> : <MovieList movies={movies} />}  */}
         
         {isLoading &&  <Loader />}
         {!isLoading && !error && <MovieList movies = {movies} /> }
         {error && <Error message = {error} /> }
         </ListBox>

       <ListBox>
         <WatchedSummary watched={watched}  />

          <WatchedMoviesList watched={watched} />
       </ListBox>


         
      </Main>
    </>
  );
}

export default App;
