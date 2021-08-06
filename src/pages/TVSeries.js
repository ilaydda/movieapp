import React from "react";
import { useEffect, useState } from "react";
import SerieDetail from "../components/SerieDetail";
import Movie from "../components/Movie";

const api_key = "api_key=6f598a7c6a2e1adf74bf01eef663f037";
const base_url = "https://api.themoviedb.org/3";
const search_api =
  "https://api.themoviedb.org/3/search/tv?&api_key=6f598a7c6a2e1adf74bf01eef663f037&query=";
const tv_series = base_url + "/discover/tv?sort_by=popularity.desc&" + api_key;

export const TVSeries = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [movieID, setMovieID] = useState();

  useEffect(() => {
    fetch(props.url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (setSearchTerm) {
      fetch(search_api + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovies(data.results);
        });
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function movieClickedHandler(movieId) {
    console.log(movieId);
    setOpenModal(true);
    setMovieID(movieId);
  }
  return (
    <div>
      <div>
        {openModal && (
          <SerieDetail closeMovieDetail={setOpenModal} id={movieID} />
        )}
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>  
      </div>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => (
            <Movie
              key={movie.id}
              {...movie}
              release_date={movie.first_air_date}
              title={movie.name}
              clickedHandler={movieClickedHandler}
            />
          ))}
      </div>
    </div>
  );
};
