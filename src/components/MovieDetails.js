import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useKey } from "./useKey";
const KEY = "f84fc31d";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched , watched}) => {
  const [movieDetails, setMovieDeatails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId)

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function fetchMoviesDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );

      const data = await res.json();
      setMovieDeatails(data);
      setIsLoading(false);
    }
    
    fetchMoviesDetails();
  }, [selectedId]);

  useEffect(() => {
    if(!title) return;
    document.title = `Movie | ${title}`

    return function () {
      document.title = 'usePopcorn';
    };
  },[title])

   useKey("Escape",onCloseMovie )

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movieDetails} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
           {!isWatched ?
           <>
              <button className="btn-add" onClick={handleAdd}>
                
                + Add
              </button>
           </>
               :
              
              <p>YOu have already rated this movie</p>
               }
            </div>
            <p>
              
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director} </p>
            {selectedId}
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
