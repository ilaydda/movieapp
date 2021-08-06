import React from "react";
import Movie from "./Movie";

import { useState, useEffect } from "react";

const api_key = "api_key=6f598a7c6a2e1adf74bf01eef663f037";
const base_url = "https://api.themoviedb.org/3";
const image_api = "https://image.tmdb.org/t/p/w500";

function MovieDetail({ closeMovieDetail, id }) {
  const [detail, setDetail] = useState();
  const [trailer, setTrailer] = useState();

  useEffect(() => {
    const movie_detail = base_url + "/movie/" + id + "?" + api_key;

    fetch(movie_detail)
      .then((response) => response.json())
      .then((data) => setDetail(data));
  }, [id]);

  useEffect(() => {
    const find_trailer = base_url + "/movie/" + id + "/videos?" + api_key;

    fetch(find_trailer)
      .then((response) => response.json())
      .then((data) => setTrailer(data));
  }, [id]);

  // const play_trailer ="https://www.themoviedb.org/video/play?key=" + trailer.results[0].key;

  return detail && trailer ? (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="closeButton">
          <button onClick={() => closeMovieDetail(false)}>X</button>
        </div>
        <div className="title">
          <h1>{detail.title} </h1>
          <br />
          {trailer.results.length  == 0 ? <img src="" /> :
          <iframe
            type="text/html"
            style={{ backgroundColor: " #000" }}
            width="90%"
            height="450px"
            src= {`//www.youtube.com/embed/${trailer.results[0].key}?autoplay=1&amp;origin=http%3A%2F%2Fwww.themoviedb.org&amp;hl=en&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
            frameborder="0"
            allowFullScreen="">
          </iframe> 
          }
          
        </div>
        <div className="body">
          <div className="movieinfo">
            <div>
              <div>
                <h3 className="tagline">{detail.tagline}</h3>
                <br />
              </div>
              <span className="release">R</span>
              <span className="releaseDate">{detail.release_date}</span>
            </div>
            <br />
            <p>{detail.overview}</p>
            <br />
            <p>Runtime: {detail.runtime} minutes</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default MovieDetail;
