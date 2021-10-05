
// Author Nirmal Bhimani B00878753
import React, { useState, useEffect } from "react";
import {
  Form,
  Button
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { courseName, validateCourseName, courseDescription, courseCredit, fileValidation } from './courseValidation';
import axios from 'axios';
import courseService from "../../../services/Expert/course.service";

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


const UpdateCourseInput = ({ handelUpdateCourseSubmit, courseId }) => {

  const classes = useStyles();
  const [course, setCourse] = useState({ courseName: "", courseDescription: "", courseCredit: "", file: "" })
  const [formErrForInsert, setFormErrsForInsert] = useState({ courseNameError: "", courseDescriptionError: "", courseCreditError: "", courseFileError: "" });
  const [file, setFile] = useState()
  const [buttonDisabled, setbuttonDisabled] = useState(true);

  useEffect(() => {
    courseService.getCourse(courseId)
      .then(res => {
        setCourse(res.data.data[0]);
        setFile(res.data.data[0].thumbnail);
      })
      .catch(err => console.log("Err is", err))
  }, [])


  const handleChange = (e) => {
    const { id, value } = e.target;
    setbuttonDisabled(false);
    switch (id) {
      case 'courseName':
        if (validateCourseName(value)) {
          setFormErrsForInsert({ ...formErrForInsert, courseNameError: "*Minimum Eight Character needed" })
          setbuttonDisabled(true)
        }
        else if (courseName(value)) {
          setFormErrsForInsert({ ...formErrForInsert, courseNameError: "*Course Name is required" })
          setbuttonDisabled(true)
        }
        else {
          setbuttonDisabled(false)
          delete formErrForInsert.courseNameError
        }
        setCourse({ ...course, courseName: value })
        break;
      case 'courseDescription':
        if (courseDescription(value)) {
          setbuttonDisabled(true)
          setFormErrsForInsert({ ...formErrForInsert, courseDescriptionError: "*Course Description is required" })
        }
        else {
          setbuttonDisabled(false)
          delete formErrForInsert.courseDescriptionError
        }
        setCourse({ ...course, courseDescription: value })
        break;
      case 'courseCredit':
        if (courseCredit(value)) {
          setbuttonDisabled(true)
          setFormErrsForInsert({ ...formErrForInsert, courseCreditError: "*Course Description is required" })
        }
        else {
          setbuttonDisabled(false)
          delete formErrForInsert.courseCreditError
        }
        setCourse({ ...course, courseCredit: value })
        break;
      case 'thumbnailCourse':
        if (fileValidation(e.target.files[0])) {
          setbuttonDisabled(true)
          setFormErrsForInsert({ ...formErrForInsert, courseFileError: "*Only jpg , png , jpeg file can be uploaded" })
        }
        else {
          setbuttonDisabled(false)
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
        <Form.Control type="text" className={classes.input} placeholder="Course Name" value={course.courseName || ""} onBlur={handleChange} onChange={handleChange} autoComplete="off" />
        <small style={{ color: "red" }}>{formErrForInsert.courseNameError}</small>
      </Form.Group>
      <Form.Group className="mb-3" rows={3} controlId="courseDescription">
        <Form.Label>Course Description</Form.Label>
        <textarea
          className="form-control"
          id="courseDescription"
          rows="5"
          onBlur={handleChange} onChange={handleChange}
          placeholder="Course Description"
          value={course.courseDescription || ""}
          autoComplete="off"
        />
        <small style={{ color: "red" }}>{formErrForInsert.courseDescriptionError}</small>
      </Form.Group>
      <Form.Group className="mb-3" controlId="courseCredit">
        <Form.Label>Credit Required</Form.Label>
        <Form.Control type="number" className={classes.input} placeholder="Credit Required" value={course.courseCredit || ""} onBlur={handleChange} onChange={handleChange} autoComplete="off" />
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
            <img src={`https://csci-5709-nodejs.herokuapp.com/${course.thumbnail}`} style={{ maxWidth: "150px", maxHeight: "150px" }} alt={course.thumbnail} />
          </div>
        </div>
        <small style={{ color: "red" }}>{formErrForInsert.courseFileError}</small>
      </Form.Group>
      <Form.Group className="mb-3" style={{ textAlign: "center" }} controlId="submit">
        <Button type="submit" onClick={() => handelUpdateCourseSubmit(course)} disabled={buttonDisabled} >Update</Button>
      </Form.Group>
    </div>
  );
}

export default UpdateCourseInput;
