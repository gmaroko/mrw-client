import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import api from '../../api/apiConfig';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import "./Reviews.css";

const Reviews = () => {

    const [movie, setMovie] = useState();
    let [reviews, setReviews] = useState([]);

    const revText = useRef();
    const { movieId } = useParams();

    const [rating, setRating] = useState(0);
    const [error, setError] = useState("");


    const getMovieApiData = async (id) => {
        try {
            const response = await api.get(`/movies/${movieId}`);
            const fetchedMovie = response.data.data;
            setMovie(fetchedMovie);
            // setReviews(fetchedMovie.reviewIds);
        }
        catch (err) {
            console.log(err);
        }
    }
    const getMovieReviews = async (id) => {
        try {
            const response = await api.get(`/reviews/${movieId}`);
            const fetchedMovieReviews = response.data.data || [];

            setReviews(fetchedMovieReviews);

            setReviews(fetchedMovieReviews);

            if(!movie){
                setMovie(getMovieApiData(id) || null);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current || "";

        if (!rev.value || rev.value.length < 20) {
            setError("Review must be at least 20 characters long.");
            return;
        }

        const response = await api.post("/reviews", {
            content: rev.value,
            movieId: movieId,
            rating: rating,
            userId: localStorage.getItem("userId") || "686dc5b88268f4c625fba934"
        });

        await getMovieReviews(movieId);

        revText.current.value = "";
        setRating(0);
    }

    useEffect(() => {
        getMovieReviews(movieId).then(r => {
            reviews = r?.data || [];
        });
    }, []);

    return (
        <Container style={{ marginTop: '1rem' }}>
            <Row>
                <h3>{movie?.title}</h3>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                         alt="Poster Missing" />
                </Col>
                <Col>

                    <Row>
                        <Col>
                            <h3>Synopsis...</h3>
                            <p>{movie?.overview}</p>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <p> User reviews ...</p>

                    {
                        reviews?.map((review) => {
                            return (
                                <div key={review.createdAt}>
                                    <Row>
                                        <Col>{review.content}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }

                    <br/>
                    <br/>
                    <br/>
                    <Row>
                        {
                            <>
                                <Row>
                                    <Col>
                                        <ReviewForm handleSubmit={addReview} revText={revText} rating={rating} setRating={setRating} labelText="Write a Review?" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>
                        }
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews;