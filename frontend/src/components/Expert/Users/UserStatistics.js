// Author Nirmal Bhimani B00878753
import React, { useState, useEffect } from "react";
import {
  Form,
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import userStatistics from '../../../services/Expert/userStatistics.service';
import { useHistory } from 'react-router-dom';

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


function UserStatistics({ userId }) {
  const classes = useStyles();

  const history = useHistory();

  const [userdata, setUserData] = useState({});
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    userStatistics.userStatistics(userId).then((response) => {
      if (response.data.success === true) {
        setUserData(response.data.userData[0]);
        setCourseData(response.data.rating)
      }
    })
      .catch((err) => {
        if (err) {
          alert("Try again After some time");
          history.push("/expert/users");
        }
      })

  }, [])
 

  return (
    <>
      <Form.Group className="mb-3" controlId="studentName">
        <Form.Label>Student Name</Form.Label>
        <Form.Control type="text" className={classes.input} value={userdata.firstname || ""} disabled />
      </Form.Group>
      <Form.Group className="mb-3" controlId="emailAddress">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="text" className={classes.input} value={userdata.email || ""} disabled />
      </Form.Group>
      <h4> Comment Made on Course</h4>
          <Table className={classes.table} aria-label="simple table" variant="dark">
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>​​​​​​​​
              { courseData.length && 
                courseData.map(function(course ,itemNumber )  {
                  return  <TableRow key={itemNumber}><TableCell>{itemNumber + 1}</TableCell><TableCell>{course.courseName}</TableCell><TableCell>{course.rating}</TableCell><TableCell>{course.comment}</TableCell></TableRow>
                })
              }
            </TableBody>
          </Table>
    </>
  )
}

export default UserStatistics
