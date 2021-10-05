// Author Nirmal Bhimani B00878753

import React, { useState } from "react";
import {
  Form,
  Button
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { courseName, validateCourseName, courseDescription, courseCredit, fileValidation } from './courseValidation';


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
  },
}));


const AddCoursesInput = ({ handelAddCourseSubmit }) => {
  const classes = useStyles();

  const [course, setCourse] = useState()
  const [formErrForInsert, setFormErrsForInsert] = useState({ courseNameError: "", courseDescriptionError: "", courseCreditError: "", courseFileError: "" });
  const [file, setFile] = useState();

  const handleChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case 'courseName':
        if (validateCourseName(value)) {
          setFormErrsForInsert({ ...formErrForInsert, courseNameError: "*Minimum Eight Character need" })
        }
        else if (courseName(value)) {
          setFormErrsForInsert({ ...formErrForInsert, courseNameError: "*Course Name is required" })
        }
        else {
          delete formErrForInsert.courseNameError
        }
        setCourse({ ...course, courseName: value })
        break;
      case 'courseDescription':
        if (courseDescription(value)) {
          setFormErrsForInsert({ ...formErrForInsert, courseDescriptionError: "*Course Description is required" })
        }
        else {
          delete formErrForInsert.courseDescriptionError
        }
        setCourse({ ...course, courseDescription: value })
        break;
      case 'courseCredit':
        if (courseCredit(value)) {
          setFormErrsForInsert({ ...formErrForInsert, courseCreditError: "*Course Description is required" })
        }
        else {
          delete formErrForInsert.courseCreditError
        }
        setCourse({ ...course, courseCredit: value })
        break;
      case 'thumbnailCourse':
        if (fileValidation(e.target.files[0])) {
          setFormErrsForInsert({ ...formErrForInsert, courseFileError: "*Only jpg , png , jpeg file can be uploaded" })
        }
        else {
          delete formErrForInsert.courseFileError
        }
        setFile(URL.createObjectURL(e.target.files[0]))
        setCourse({ ...course, file: e.target.files[0] })
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <Form.Group className="mb-3" controlId="courseName">
        <Form.Label>Course Name</Form.Label>
        <Form.Control type="text" className={classes.input} placeholder="Course Name" onBlur={handleChange} onChange={handleChange} autoComplete="off" />
        <small style={{ color: "red" }}>{formErrForInsert.courseNameError}</small>
      </Form.Group>
      <Form.Group className="mb-3" rows={3} controlId="courseDescription">
        <Form.Label>Course Description</Form.Label>
        <textarea
          className="form-control"
          id="courseDescription"
          rows="5"
          onBlur={handleChange} onChange={handleChange}
          autoComplete="off"
        />
        <small style={{ color: "red" }}>{formErrForInsert.courseDescriptionError}</small>
      </Form.Group>
      <Form.Group className="mb-3" controlId="courseCredit">
        <Form.Label>Credit Required</Form.Label>
        <Form.Control type="number" className={classes.input} placeholder="Credit Required" onBlur={handleChange} onChange={handleChange} autoComplete="off" />
        <small style={{ color: "red" }}>{formErrForInsert.courseCreditError}</small>
      </Form.Group>
      <Form.Group className="mb-3" controlId="thumbnailCourse">
        <div className="row" style={{ marginLeft: "2px" }}>
          <div className="md-4">
            <Form.Label>Upload Thumbnail Of Course</Form.Label>
            <Form.Control
              type="file"
              className={classes.input}
              onChange={handleChange}
            />
          </div>
          <div className="md-4">
            <img src={file} style={{ maxWidth: "150px", maxHeight: "150px" }} />
          </div>
        </div>
        <small style={{ color: "red" }}>{formErrForInsert.courseFileError}</small>
      </Form.Group>
      <Form.Group className="mb-3" style={{ textAlign: "center" }} controlId="submit">
        <Button type="submit" onClick={() => handelAddCourseSubmit(course)} disabled={Object.entries(formErrForInsert || {}).length > 0} >Submit</Button>
      </Form.Group>
    </div>
  );
}

export default AddCoursesInput;
