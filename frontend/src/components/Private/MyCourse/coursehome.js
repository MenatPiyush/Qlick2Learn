import React, { useState, useEffect } from 'react';
import VideoCard from './videocard';
import CourseContent from './coursecontent';
import './coursehome.css';
import Rating from 'react-simple-star-rating';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from "react-router-dom";


function CourseHome() {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const userid = localStorage.getItem("UserId");
    const location = useLocation();
    const courseid = location.state.detail;

    const handleRating = (rate) => {
        setRating(rate)
    }

    const addrating = () => {
        axios.post(`https://csci-5709-nodejs.herokuapp.com/api/student/addrating`, { "courseid": courseid, "rating": rating, "comment": comment , "userid": userid }).then(res => {
            console.log(res.data);
        }).catch(err => console.log("Err is", err))
        document.getElementById('comment').value='';
        setRating(0);
    }


    return (
        <div id="course" style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "100vh" }}>
            <div>
                <VideoCard course={courseid} />
            </div>
            <div>
                <h2>Notes</h2>
                <CourseContent course={courseid} />
            </div>
            <div>
                <h2>Rate the Course</h2>
                <Card style={{ width: '50rem', maxheight: '100rem' }} id="rate">
                    <Card.Body>
                        <Rating
                            onClick={handleRating} ratingValue={rating} 
                            size={20}
                            transition
                            fillColor='gold'
                            emptyColor='gray'
                            className='foo'
                        />
                        <Button type="submit" id="button" onClick={() => addrating()}>Post Rating</Button>
                        <Card.Text>
                            <textarea class="form-control" rows="10" id="comment" placeholder="Comment.." onChange={(e) => { setComment(e.target.value) }}></textarea>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
export default CourseHome;