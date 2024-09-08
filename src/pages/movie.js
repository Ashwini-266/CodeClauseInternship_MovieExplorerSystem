import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState(null); // Initialize with null
    const { id } = useParams();

    useEffect(() => {
        getData();
        window.scrollTo(0, 0); // Scroll to top when component mounts
    }, [id]); // Dependency array ensures effect runs when `id` changes

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => res.json())
            .then(data => setMovie(data))
            .catch(err => console.error("Error fetching data:", err)); // Added error handling
    };

    return (
        <div className="movie">
            <div className="movie__intro">
                <img
                    className="movie__backdrop"
                    src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.backdrop_path || ""}`}
                    alt={currentMovieDetail?.original_title || "Movie Backdrop"}
                />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img
                            className="movie__poster"
                            src={`https://image.tmdb.org/t/p/original${currentMovieDetail?.poster_path || ""}`}
                            alt={currentMovieDetail?.original_title || "Movie Poster"}
                        />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail?.original_title || "Title Not Available"}</div>
                        <div className="movie__tagline">{currentMovieDetail?.tagline || ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail?.vote_average || "N/A"} <i className="fas fa-star" />
                            <span className="movie__voteCount">
                                {currentMovieDetail?.vote_count ? `(${currentMovieDetail.vote_count}) votes` : "No votes"}
                            </span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail?.runtime ? `${currentMovieDetail.runtime} mins` : "Runtime not available"}</div>
                        <div className="movie__releaseDate">{currentMovieDetail?.release_date ? `Release date: ${currentMovieDetail.release_date}` : "Release date not available"}</div>
                        <div className="movie__genres">
                            {currentMovieDetail?.genres?.map(genre => (
                                <span className="movie__genre" key={genre.id}>{genre.name}</span>
                            )) || "Genres not available"}
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail?.overview || "Synopsis not available"}</div>
                    </div>
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {currentMovieDetail?.homepage && (
                    <a href={currentMovieDetail.homepage} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p>
                    </a>
                )}
                {currentMovieDetail?.imdb_id && (
                    <a href={`https://www.imdb.com/title/${currentMovieDetail.imdb_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                        <p><span className="movie__imdbButton movie__Button">IMDb <i className="newTab fas fa-external-link-alt"></i></span></p>
                    </a>
                )}
            </div>
            <div className="movie__heading">Production Companies</div>
            <div className="movie__production">
                {currentMovieDetail?.production_companies?.map(company => (
                    company.logo_path && (
                        <div className="productionCompanyImage" key={company.id}>
                            <img className="movie__productionCompany" src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt={company.name} />
                            <span>{company.name}</span>
                        </div>
                    )
                )) || "Production companies not available"}
            </div>
        </div>
    );
};

export default Movie;
