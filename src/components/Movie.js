import React from "react";

const image_api = "https://image.tmdb.org/t/p/w500";

const setColor = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
};

const Movie = ({
  id,
  title,
  poster_path,
  vote_average,
  clickedHandler,
}) => (
  <div className="movie">
    <div style={{ cursor: "pointer" }} onClick={() => clickedHandler(id)}>
      <img src={poster_path ? image_api + poster_path : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} alt={title} />
    </div>
    <div className="movie-info">
      <h3>{title}</h3>
      <span className={`tag ${setColor(vote_average)}`}>{vote_average}</span>
    </div>
  </div>
);

export default Movie;
