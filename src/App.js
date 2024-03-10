import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import Search from "./components/Search";
import NumResult from "./components/NumResult";
import ListBox from "./components/ListBox";
import WatchedBox from "./components/WatchedBox";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import Error from "./components/Error";

const KEY = "f84fc31d";
const tempQuery = "ford";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  // useEffect(function () {
  //   async function fetchingMovies() {
  //     setIsLoading(true);

  //     try {
  //       const res = await fetch(
  //         `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
  //       );

  //       if (!res.ok) {
  //         throw new Error(
  //           "Something went wrong! Kindly check your internet connection"
  //         );
  //       }

  //       const data = await res.json();

  //       if (data.Response === "False") {
  //         throw new Error("Movie not Found");
  //       }

  //       setMovies(data.Search);
  //     } catch (err) {
  //       // console.log(err.message);
  //       setError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchingMovies();
  // }, []);

  useEffect(function () {
    setIsLoading(true)
      async function fetchMovies(){
       try {const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${tempQuery}`)

        if(!res.ok) throw new Error("Something went wrong!")

        const data = await res.json();

        if(data.Response === 'False') throw new Error("Movie not found :(")
          
        setMovies(data.Search)
        
      } catch(err){
        setError(err.message)
      } finally{
          setIsLoading(false)

        }
      }

      fetchMovies();
  },[])

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <ListBox>
         
          {isLoading && <Loader /> }
          {!isLoading && !error  && <MovieList movies={movies} /> }
          {error ?  <Error  message ={error} /> :  null}

        </ListBox>

        <ListBox>
          <WatchedSummary watched={watched} />

          <WatchedMoviesList watched={watched} />
        </ListBox>
      </Main>
    </>
  );
}

export default App;
