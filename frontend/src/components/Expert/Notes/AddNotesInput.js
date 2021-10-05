// Author Nirmal Bhimani B00878753
import React, { useState  } from "react";
import {
    Form,
    Button
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { notesTitle , selectCourse , notesName } from './notesValidation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSelector } from "react-redux";
import QuillEditor from '../Editor/QuillEditor';
import notesService from '../../../services/Expert/notes.service';

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
const AddNotesInput = ({ courseData , handelAddCourseSubmit}) => {
    const classes = useStyles();

    const [note, setNote] = useState()
    const [formErrForInsert, setFormErrsForInsert] = useState({errorForCourseSelect :"" , errorForNotesName:"", errorForNotesTitle : ""});

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

    const onSubmit = (event) => {
        event.preventDefault();
        const formData = {
            content,
            courseId: note.courseId,
            notesName: note.notesName,
            notesTitle: note.notesTitle,
            notesReference : note.notesReference
        };

        notesService.addNote(formData)
          .then((res) => {

            if(res.data.success == true){
                toast.success('Notes Addedd successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                  })
                  handelAddCourseSubmit(res.data.data[0] , true);
            }
          })
          .catch((err) => {
            toast.error('Try again!', {
              position: toast.POSITION.TOP_RIGHT
            })
          })
    }

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
            case 'notesname' :
                if(notesName(value)){
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

    return (
        <div>
            <Form.Group className="mb-3" controlId="noteename">
                    <Form.Label>Select Course</Form.Label>
                <select className={`form-control ${classes.input}`} id="courseSelect" onBlur={handleChange} onChange={handleChange}>
                    <option value="" >Select Course</option>
                     { (courseData && courseData.length) ? 
                      courseData.map((t , itemNumber) => {
                        return (
                           <option value={t.courseId} key={itemNumber +1}>{t.courseName}</option>  
                        )
                    }) : null
                        
                     }
                    </select>
                    <small style={{ color: "red" }}>{formErrForInsert.errorForCourseSelect}</small>
            </Form.Group>
            <Form.Group className="mb-3" controlId="notesname">
                <Form.Label>Note Name</Form.Label>
                <Form.Control type="select" className={classes.input} placeholder="Select Note" onBlur={handleChange} onChange={handleChange} autoComplete="off"/>
                <small style={{ color: "red" }}>{formErrForInsert.errorForNotesName}</small>
            </Form.Group>
            <Form.Group className="mb-3" rows={3} controlId="notesTitle">
                <Form.Label>Notes Title </Form.Label>
                <Form.Control type="text" rows={3} className={classes.input} placeholder="Notes Title" onBlur={handleChange} onChange={handleChange} autoComplete="off" />
                <small style={{ color: "red" }}>{formErrForInsert.errorForNotesTitle}</small>
            </Form.Group>
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
                />
            <Form.Group className="mb-3" controlId="notesReference">
                <Form.Label>References</Form.Label>
                <Form.Control type="text" className={classes.input} placeholder="Reference" autoComplete="off" onBlur={handleChange} onChange={handleChange} autoComplete="off"/>
            </Form.Group>
            <Form.Group className="mb-3" style= {{textAlign: "center"}} controlId="submit">
            <Button type="submit" onClick={(e) => onSubmit(e)} disabled={Object.entries(formErrForInsert || {}).length >0} >Submit</Button>
          </Form.Group>
        </div>
    );
}

export default AddNotesInput;
