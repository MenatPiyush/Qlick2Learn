
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
import axios from 'axios';
import { notesTitle, notesDescription, selectCourse, notesName } from './notesValidation';
import notesService from '../../../services/Expert/notes.service';

const useStyles = makeStyles((theme) => ({
  
    right: {
        [theme.breakpoints.down("md")]: {
            marginTop: 30,
        },
    },
  
    input: {
        color: '#000',
        fontSize: 12,
        textTransform: "capitalize",
        fontWeight: 500,
        height: '50px',
        '&::placeholder': {
            textTransform: "capitalize",
        },
    },
 
}));


const UpdateNotesInput = ({ id, courseData }) => {
    const classes = useStyles();

    const [note, setNote] = useState({ courseName: "", courseId: "", notesName: "", notesTitle: "", notesReference: "" })
    const [formErrForInsert, setFormErrsForInsert] = useState({ errorForCourseSelect: "", errorForNotesName: "", errorForNotesTitle: "" });
    const [courseId, setCourseId] = useState(null);

    useEffect(() => {
        notesService.getNote(id).then(res => {
            setNote(res.data.data[0])
        }).catch(err => console.log("Err is", err))
    }, [])

    function handleChange(e) {
        e.preventDefault();
        const { id, value } = e.target;
        switch (id) {
            case 'courseSelect':
                if (selectCourse(value)) {
                    setFormErrsForInsert({ ...formErrForInsert, errorForCourseSelect: "*Select Course from list" })
                }
                else {
                    delete formErrForInsert.errorForCourseSelect
                }
                setNote({ ...note, courseId: value })
                break;
            case 'notesname':
                if (notesName(value)) {
                    setFormErrsForInsert({ ...formErrForInsert, errorForNotesName: "*Notes Name is required" })
                }
                else {
                    delete formErrForInsert.errorForNotesName;
                }
                setNote({ ...note, notesName: value })
                break;
            case 'notesTitle':
                if (notesTitle(value)) {
                    setFormErrsForInsert({ ...formErrForInsert, errorForNotesTitle: "*Notes Title is required" })
                }
                else {
                    delete formErrForInsert.errorForNotesTitle
                }
                setNote({ ...note, notesTitle: value })
                break;
            case 'notesTitle':
                if (notesTitle(value)) {
                    setFormErrsForInsert({ ...formErrForInsert, errorForNotesTitle: "*Notes Title is required" })
                }
                else {
                    delete formErrForInsert.errorForNotesTitle
                }
                setNote({ ...note, notesTitle: value })
                break;
            case 'notesReference':
                setNote({ ...note, notesReference: value })
                break;
            default:
                break;
        }
    }

    // quill text editor 
    const [content, setContent] = useState("")
    const [files, setFiles] = useState([])

    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    return (
        <div>
            <Form.Group className="mb-3" controlId="noteename">
                <Form.Label>Select Course</Form.Label>
                <select className={`form-control ${classes.input}`} id="courseSelect" onBlur={handleChange} onChange={handleChange} value={note.courseId}>
                    <option value="" >Select Course</option>
                    {(courseData && courseData.length) ?
                        courseData.map((t, itemNumber) => {
                            return (
                                <option value={t.courseId} key={itemNumber + 1} >{t.courseName}</option>
                            )
                        }
                        ) : null
                    }
                </select>
                <small style={{ color: "red" }}>{formErrForInsert.errorForCourseSelect}</small>
            </Form.Group>
            <Form.Group className="mb-3" controlId="notesname">
                <Form.Label>Note Name</Form.Label>
                <Form.Control type="select" className={classes.input} placeholder="Notes Name" value={note.notesName || ""} onBlur={handleChange} onChange={handleChange} autoComplete="off" />
            </Form.Group>
            <Form.Group className="mb-3" rows={3} controlId="notesTitle">
                <Form.Label>Notes Title </Form.Label>
                <Form.Control type="text" rows={3} className={classes.input} placeholder="Notes Title" value={note.notesTitle || ""} onBlur={handleChange} onChange={handleChange} autoComplete="off" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="notesReference">
                <Form.Label>Content</Form.Label>
                <div dangerouslySetInnerHTML={{ __html: note.content || "" }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="notesReference">
                <Form.Label>References</Form.Label>
                <Form.Control type="text" className={classes.input} placeholder="Notes Reference" value={note.notesReference || ""} onBlur={handleChange} onChange={handleChange} autoComplete="off" />
            </Form.Group>
        </div>
    );
}

export default UpdateNotesInput;
