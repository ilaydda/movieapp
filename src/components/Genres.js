import React from 'react';
import { useState, useEffect } from "react";

const api_key = "api_key=6f598a7c6a2e1adf74bf01eef663f037";
const base_url = "https://api.themoviedb.org/3";
//const list_with_genres = base_url + "/discover/movie?" + api_key + "&with_genres=" + genre.genres[0].id ;
const find_genres = base_url + "/genre/movie/list?" + api_key;

function Genres() {

    const [genre, setGenre] = useState();

    useEffect(() => {


        fetch(find_genres)
            .then((response) => response.json())
            .then((data) => setGenre(data));
    });

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

}

export default Genres;

