import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { useContext } from "react";
import { MoviesContext } from "../../MoviesContext";
import "./Landing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Landing = () => {
    const movies = useContext(MoviesContext);

    const moviesData = movies?.results || [];

    const navigate = useNavigate();

    if (!moviesData || moviesData.length === 0) {
        return (
            <div className="movie-carousel-container">
                <Carousel>
                    Loading...
                </Carousel>
            </div>
        )
    } else {
        return (
            <div className="movie-carousel-container">
                <Carousel>
                    {moviesData.map((movie) => (
                        <Paper key={movie.id}>
                            <div className="movie-card-container">
                                <div
                                    className="movie-card"
                                    style={{ "--img": `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
                                >
                                    <div className="movie-detail">
                                        <div className="movie-poster">
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt="Poster Missing" />
                                        </div>
                                        <div className="movie-title">
                                            <h4>{movie.title}</h4>
                                        </div>

                                        <div className="movie-buttons-container">
                                            <div className="play-button-icon-container">
                                                <FontAwesomeIcon
                                                    className="play-button-icon"
                                                    icon={faCirclePlay}
                                                />
                                            </div>

                                            <div className="movie-review-button-container">
                                                <Button variant="info" onClick={() => navigate(`/reviews/${movie.id}`)}>
                                                    Review...
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    ))}
                </Carousel>
            </div>
        );
    }
}

export default Landing;