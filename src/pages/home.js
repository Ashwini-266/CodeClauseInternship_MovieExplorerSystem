import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../components/movieList";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
            .then(res => res.json())
            .then(data => setPopularMovies(data.results)) // Set only the results array
            .catch(err => console.error("Error fetching popular movies:", err));
    }, []); // Empty dependency array to run only on mount

    return (
        <div className="poster">
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {popularMovies.map(movie => (
                    <Link key={movie.id} style={{ textDecoration: "none", color: "white" }} to={`/movie/${movie.id}`}>
                        <div className="posterImage">
                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.original_title} />
                        </div>
                        <div className="posterImage_overlay">
                            <div className="posterImage_title">{movie.original_title}</div>
                            <div className="posterImage_runtime">
                                {movie.release_date}
                                <span className="posterImage_rating">
                                    {movie.vote_average}
                                    <i className="fas fa-star" />{""}
                                </span>
                            </div>
                            <div className="posterImage_description">{movie.overview}</div>
                        </div>
                    </Link>
                ))}
            </Carousel>
            <MovieList/>
            
        </div>
    );
}

export default Home;
