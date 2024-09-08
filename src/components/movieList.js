import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from '../components/card'; // Correct path to Cards component

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        getData();
    }, [type]); // Fetch data whenever `type` changes

    const getData = () => {
        const endpoint = `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;

        fetch(endpoint)
            .then(res => res.json())
            .then(data => setMovieList(data.results))
            .catch(err => console.error("Error fetching data:", err)); // Added error handling
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {movieList.map(movie => (
                    <Cards key={movie.id} movie={movie} /> // Added key prop
                ))}
            </div>
        </div>
    );
};

export default MovieList;
