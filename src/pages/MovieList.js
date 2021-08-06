import React, { useImperativeHandle } from "react";
import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import MovieDetail from "../components/MovieDetail";

const api_key = "api_key=6f598a7c6a2e1adf74bf01eef663f037";
const base_url = "https://api.themoviedb.org/3";
const popular_movies = base_url + "/discover/movie?sort_by=popularity.desc&" + api_key;
const search_api = "https://api.themoviedb.org/3/search/movie?&api_key=6f598a7c6a2e1adf74bf01eef663f037&query=";

export const MovieList = React.forwardRef((props, ref) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [movieID, setMovieID] = useState();
  // const [page2, setPage2] = useState();

  useImperativeHandle(ref, () => {
    return {
      yeniFilmleriYukle() {
        console.log("yenisi yükleniyor.")

        // const get_page2 = popular_movies + "&page=2";
        // fetch(get_page2)
        //   .then((response) => response.json())
        //   .then((data) => setpage2(data));


      }
    }
  })

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

    if (searchTerm.trim().length > 0) {
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
          <MovieDetail closeMovieDetail={setOpenModal} id={movieID} />
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
        {movies && movies.length > 0 &&
          movies.map((movie) => (
            <Movie
              key={movie.id}
              {...movie}
              clickedHandler={movieClickedHandler}
            />
          ))}
      </div>
    </div>
  );
});
