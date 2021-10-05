import Card from 'react-bootstrap/Card';
import './coursecontent.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function CourseContent({ course }) {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get("https://csci-5709-nodejs.herokuapp.com/api/student/getnotes/" + course).then(res => {
            setNotes(res.data.data);
        }).catch(err => console.log("Err is", err))
    });

    return (
        <div  style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "100vh" }}> {
      notes.map((item) => {
            return (
                <div className="coursecontent">
                    <Card style={{ width: '50rem', maxheight: '100rem' }}>
                        <Card.Header as="h3">{item.notesName}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                              
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            );
        })
    }
        </div>
      
    )
}

export default CourseContent;