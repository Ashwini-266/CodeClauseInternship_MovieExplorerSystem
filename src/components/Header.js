import React from "react";
import './Header.css';
import {Link} from "react-router-dom"


const Header = () => {
    return(
        <div className="header">
            <Link to="/"><img className="header_icon" src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"/></Link>
            <Link to="/movies/popular" style={{textDecoration:"none"}}><span>popular</span></Link>
            <Link to="/movies/top_rated"style={{textDecoration:"none"}}><span>top Rated</span></Link>
            <Link to="/movies/upcoming"style={{textDecoration:"none"}}><span>upcoming</span></Link>
        </div>
    )
    
}
export default Header
