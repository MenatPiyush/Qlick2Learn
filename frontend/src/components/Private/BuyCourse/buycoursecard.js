import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa";
import { RiCoinsLine } from "react-icons/ri";
import image from './test1.jpg';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function BCourseCard() {
    const history = useHistory();
    const [details, setDetails] = useState([]);

    async function handleOnClick(courseid) {
        console.log(courseid);
        history.push({pathname: '/coursedetail',state: { detail: courseid }})
    };

    useEffect(() => {
        axios.get("https://csci-5709-nodejs.herokuapp.com/api/student/getCourses").then(res => {
            setDetails(res.data.data);
            console.log(details);
        }).catch(err => console.log("Err is", err))
    })

    return (
        details.map((item) => {
            return (
                <div className="coursecard">
                    <Card style={{ width: '20rem' }} onClick={(e) => handleOnClick(item.courseId)}>
                        <Card.Img className="img" src={`https://csci-5709-nodejs.herokuapp.com/${item.thumbnail}`} />
                        <Card.Body className="text1">
                            <div className="sub"><Card.Title>{item.courseName}</Card.Title></div>
                            <div className="sub2">
                                <div className="sub" id="icon"> {item.courseCredit} <RiCoinsLine size={15} /></div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            );
        })
    )
}