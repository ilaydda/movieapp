import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <nav className="navbar">
            <div className="nav-container">

                <NavLink exact to="/" className="nav-logo" onClick={handleClick}>
                    İLO <i className="fab fa-studiovinari">
                    </i>MOVİE
                </NavLink>

                <ul className={click ? "nav-menu active" : "nav-menu"}>

                    <li className="nav-item">
                        <NavLink exact to="/popular_movies" activeClassName="active" className="nav-links" onClick={handleClick}>Popular Movies</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/top_rated_movies" activeClassName="active" className="nav-links" onClick={handleClick}>Top Rated Movies</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/new_released_movies" activeClassName="active" className="nav-links" onClick={handleClick}>New Released Movies</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/tv_series" activeClassName="active" className="nav-links" onClick={handleClick}>TV Series</NavLink>
                    </li>
                    {/* <li className="nav-item">
                        <NavLink exact to="/contact" activeClassName="active" className="nav-links" onClick={handleClick}>Genres</NavLink>
                    </li> */}
                </ul>
                <div className="nav-icon" onClick={handleClick} >
                    <i class={click ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
