import { useState } from "react";
import "./SortingMovies.css";

const SortingMovies = () => {
    const movies = [
        { name: "Inception", rating: 4.8 },
        { name: "The Dark Knight", rating: 4.9 },
        { name: "Interstellar", rating: 4.6 },
        { name: "Forrest Gump", rating: 3.9 },
        { name: "The Matrix", rating: 4.7 },
        { name: "Titanic", rating: 3.9 },
        { name: "The Godfather", rating: 4.8 },
        { name: "Avatar", rating: 2.4 },
        { name: "Pulp Fiction", rating: 3.2 },
        { name: "Redemption", rating: 4.8 },
    ];

    const [isSorted, setIsSorted] = useState(false);

    const displayedMovies = isSorted
        ? [...movies].sort((a,b)=>{
            if(b.rating != a.rating){
                return b.rating - a.rating
            }

            return a.name.localeCompare(b.name)
        })
        : movies

    const handleSort = () => {
        setIsSorted((prev) => !prev);
    };

    return (
        <div className="sorting-movies">

            <div className="movies-header">
                <div>
                    <h1>🎬 Sorting Movies</h1>
                    <p>
                        Sort movies by rating and alphabetically
                        when ratings are equal.
                    </p>
                </div>

                <button
                    className={`sort-btn ${isSorted ? "unsort" : ""}`}
                    onClick={handleSort}
                >
                    {isSorted ? "↩ Unsort" : "⬇ Sort Movies"}
                </button>
            </div>

            <div className="movies-list">
                {displayedMovies.map((movie, index) => (
                    <div className="movie-card" key={movie.name}>

                        <div className="movie-rank">
                            {index + 1}
                        </div>

                        <div className="movie-info">
                            <h3>{movie.name}</h3>
                            <span>Movie</span>
                        </div>

                        <div className="movie-rating">
                            ⭐ {movie.rating.toFixed(1)}
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default SortingMovies;