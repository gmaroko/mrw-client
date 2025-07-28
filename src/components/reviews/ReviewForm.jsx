import React from 'react'
import { Form, Button } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";


const ReviewForm = ({ handleSubmit, revText, labelText, defaultValue, rating, error, setRating }) => {
    return (
        <Form>

            <Form.Group className="mb-3" controlId="starRating">
                <Form.Label column={true}>Rating</Form.Label>
                <ReactStars
                    count={5}
                    onChange={setRating}
                    size={30}
                    activeColor="#ffd700"
                    value={rating}
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId="exampleForm.ControlTextarea1">
                <Form.Label column={true}>{labelText}</Form.Label>
                <Form.Control ref={revText} as='textarea' rows={3} defaultValue={defaultValue} required minLength={20}/>
            </Form.Group>

            {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

            <Button variant='outline-info' onClick={handleSubmit}>Submit review</Button>
        </Form>
    )
}

export default ReviewForm;