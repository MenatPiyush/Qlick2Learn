import { CardDeck } from "react-bootstrap";
import './mycourses.css';
import React from 'react';
import CourseCard from './coursecard';

function MyCourse() {

    return (
        <div style={{  overflowY: "auto", overflowX: "hidden",  maxHeight: "100vh"  }}>
            
            <div class="row" style= {{textAlign: "center" , justifyContent:"center"}}>  <h2>My Courses</h2></div>
           
            <CardDeck>
            <CourseCard/>
            </CardDeck>
        </div>
    );
}

export default MyCourse;