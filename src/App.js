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
import MovieDetails from "./components/MovieDetails";
import { useLocalStorageState } from "./components/useLocalStorageState";
import { useMovies } from "./components/useMovies";



function App() {
  const [query, setQuery] = useState("");
 
  const {movies , isLoading, error} = useMovies(query)
  
  const [selectedId, setSelectedId] = useState(null);
  
  const [watched, setWatched] = useLocalStorageState([], "watched")

  function handleSelectedId(id) {
    setSelectedId((prevId) => (prevId === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched",  JSON.stringify(watched));
  },[watched])
  

  

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <ListBox>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectedId={handleSelectedId} />
          )}
          {error ? <Error message={error} /> : null}
        </ListBox>

        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />

              <WatchedMoviesList
                watched={watched}
                onDeleteMovie={handleDeleteWatched}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}

export default App;
