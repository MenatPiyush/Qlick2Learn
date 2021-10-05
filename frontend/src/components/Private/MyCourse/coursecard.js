import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { BsFillTrashFill } from "react-icons/bs";
import image from './test1.jpg';
import './coursecard.css'
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function CourseCard() {
    const history = useHistory();
    const userid = localStorage.getItem("UserId");
    const handleOnClick = (courseId) => { history.push({ pathname: '/coursehome', state: { detail: courseId } }) }
    const [details, setDetails] = useState([]);

    const deletecourse = (ucid) => {
        axios.delete("https://csci-5709-nodejs.herokuapp.com/api/student/deleteCourse/" + ucid).then(res => {
            console.log(res.data);
        }).catch(err => console.log("Err is", err))
    };


    useEffect(() => {
        axios.get("https://csci-5709-nodejs.herokuapp.com/api/student/getUCourses/" + userid).then(res => {
            setDetails(res.data.data);
        }).catch(err => console.log("Err is", err))
    });

    return (
        details.map((item) => {
            return (
                <div className="coursecard">
                    <Card style={{ width: '20rem' }}>
                        <Card.Img className="img" src={`https://csci-5709-nodejs.herokuapp.com/${item.thumbnail}`} onClick={() => handleOnClick(item.courseId)} />
                        <Card.Body className="text1">
                            <div className="sub"><Card.Title>{item.courseName}</Card.Title></div>
                            <div className="sub" id="icon" ><BsFillTrashFill size={20} onClick={() => deletecourse(item.ucId)} /></div>
                        </Card.Body>
                    </Card>
                </div>
            );
        })
    )
}

export default CourseCard;