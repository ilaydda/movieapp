import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { TVSeries } from "./pages/TVSeries";
import { MovieList } from "./pages/MovieList";
import { Contact } from "./pages/Contact";

const api_key = "api_key=6f598a7c6a2e1adf74bf01eef663f037";
const base_url = "https://api.themoviedb.org/3";
const popular_movies = base_url + "/discover/movie?sort_by=popularity.desc&" + api_key;
const toprated_movies = base_url + "/movie/top_rated?.desc&" + api_key;
const new_movies = base_url + "/discover/movie?sort_by=release_date.desc&release_date.lte=2021-08-02&" + api_key;
const tv_series = base_url + "/discover/tv?sort_by=popularity.desc&" + api_key;
const get_page2 = popular_movies + "&page=2";

//const list_with_genres = base_url + "/discover/movie?" + api_key + "&with_genres=" + genre_id ;

function App() {
  const [state, setState] = React.useState({
    ticking: false,
  })
  const refA = React.useRef();
  const refB = React.useRef();
  const refC = React.useRef();

  React.useEffect(() => {
    document.addEventListener('scroll', function (e) {
      let lastKnownScrollPosition = window.scrollY;

      if (!state.ticking) {
        window.requestAnimationFrame(function () {
          state.ticking = false;
          if (window.scrollY + window.innerHeight > 1800) {
            refA.current.yeniFilmleriYukle()
          }

        });

        state.ticking = true;
      }
    });
  }, [])

  return (
    <>
      <header>
        <Router>
          <Navbar />
          <div className="pages">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/popular_movies"><MovieList ref={refA} url={popular_movies} key={1} /></Route>
              <Route exact path="/top_rated_movies"> <MovieList ref={refB} url={toprated_movies} key={2} /></Route>
              <Route exact path="/new_released_movies"> <MovieList ref={refC} url={new_movies} key={3} /></Route>
              <Route exact path="/TV_series"><TVSeries url={tv_series} key={4} /></Route>
              {/* <Route exact path="/contact" component={Contact} /> */}

            </Switch>
          </div>
        </Router>
      </header>
      <footer>Copyright © 2021 by ILAYDA ATAY | All rights reserved</footer>
    </>
  );
}

export default App;
