// Author Nirmal Bhimani B00878753
import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    Form,
    Button,
    Modal
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { notesTitle, notesDescription, selectCourse, notesName } from './notesValidation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Typography, message } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";
import QuillEditor from '../Editor/QuillEditor';

const useStyles = makeStyles((theme) => ({
  
    input: {
        color: '#000',
        fontSize: 12,
        textTransform: "capitalize",
        fontWeight: 500,
        height: '50px',
        '&::placeholder': {
            textTransform: "capitalize",
        },
    }

}));

toast.configure()
const ViewNotesInput = ({ id }) => {
    const classes = useStyles();

    const [notesdata, setNotesData] = useState({courseName : "",  });

    useEffect(() => {
        axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/getNote/" + id).then(res => {
            console.log(res.data.data[0]);
            setNotesData(res.data.data[0]);
        }).catch(err => console.log("Err is", err))
    }, [])



    console.log(id);
    return (
        <div>

            <Form.Group className="mb-3" controlId="noteename">

                <Form.Label>Select Course</Form.Label>

                <select className={`form-control ${classes.input}`} id="courseSelect" >
                    <option value="" > {notesdata.courseName}</option>
                </select>
            
            </Form.Group>
            <Form.Group className="mb-3" controlId="notesname">
                <Form.Label>Note Name</Form.Label>
                <Form.Control type="select" className={classes.input} value= {notesdata.notesName}   autoComplete="off" />
               
            </Form.Group>

            <Form.Group className="mb-3" rows={3} controlId="notesTitle">
                <Form.Label>Notes Title </Form.Label>
                <Form.Control type="text" rows={3} className={classes.input} value= {notesdata.notesTitle} autoComplete="off" />
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="notesReference">
                <Form.Label>Content</Form.Label>
                <div dangerouslySetInnerHTML={{ __html: notesdata.content }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="notesReference">
                <Form.Label>References</Form.Label>
                <Form.Control type="text" className={classes.input}  value= {notesdata.notesReference}  autoComplete="off"  autoComplete="off" />
            </Form.Group>

        </div>
    );
}

export default ViewNotesInput;
