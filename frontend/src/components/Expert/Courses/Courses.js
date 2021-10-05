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
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPen } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddCoursesInput from './AddCoursesInput';
import UpdateCourseInput from './UpdateCourseInput';
import TableContainer from '@material-ui/core/TableContainer';
import courseService from '../../../services/Expert/course.service';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: '36px 0 32px 36px',
    fontSize: '36px',
    textTransform: "capitalize",
    marginBottom: '0px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
      padding: '12px 0 12px 12px',
      textAlign: 'center',
    },
  },
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
  btnsubmit: {
    background: '#000',
    color: '#fff',
    width: '100%',
    padding: '10px',
    height: '60px',
    border: 'none',
    borderRadius: '16px',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    textTransform: "capitalize",
    '&:hover': {
      background: "#fff",
      color: '#000',
      border: 'none',
    },
    [theme.breakpoints.down("md")]: {
      width: '80%',
      margin: '10px 0'
    }
  },
  editButton: {
    '&:focus': {
      backgroundColor: 'rgb(0, 255, 0) !important',
      borderColor: 'rgb(0, 255, 0) !important',
      color: "#ffffff !important"
    },
  },
  deleteButton: {
    '&:focus': {
      backgroundColor: 'rgb(255, 0, 0) !important',
      borderColor: 'rgb(255, 0, 0) !important',
      color: "#ffffff !important"
    },
  },
  addButton: {
    '&:focus': {
      color: "#ffffff !important",
      backgroundColor: 'rgb(0, 0, 0) !important'
    },
    '&:hover': {
      color: "rgb(0, 0, 0) !important",
      backgroundColor: '#ffffff !important'
    },
  },
  background: {
    background: "linear-gradient(to right, #fa709a 0%, #fee140 100%) !important"
  }

}));

toast.configure()
function Courses(props) {

  const classes = useStyles();

  const [tabledata, settabledata] = useState([]);
  const [searchstr, setsearchstr] = useState("");
  const [searcheddata, setsearcheddata] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);


  const [showUpdate, setShowUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(null);


  const [showDelete, setShowDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [itemNumber, setitemNumber] = useState(null);

  useEffect(() => {
    courseService.getCourses().then(res => {
      settabledata(res.data.data);
      setsearcheddata(res.data.data);
    }).catch(err => console.log("Err is", err))
  }, [])

  const handelAddCourseSubmit = (data) => {
    const formData = new FormData()
    formData.append('file', data.file);
    formData.append('courseName', data.courseName);
    formData.append('courseDescription', data.courseDescription);
    formData.append('courseCredit', data.courseCredit);

    courseService.addCourse(formData)
      .then((res) => {
        if (res.data.success == true) {
          toast.success('Course Addedd successfully!', {
            position: toast.POSITION.TOP_RIGHT
          })
          setShow(false);
          settabledata([...tabledata, res.data.data[0]])
        }
        else {
          if (res.data.data == "duplicateentry") {
            console.log("in if condition");
            toast.error('Course Name is already present!', {
              position: toast.POSITION.TOP_RIGHT
            })
          }
        }
      })
      .catch((err) => {
        toast.error('Try again!', {
          position: toast.POSITION.TOP_RIGHT
        })
        setShow(false);
      })
  };

  const handelUpdateCourseSubmit = (data) => {
    const formData = new FormData()
    formData.append('file', data.file);
    formData.append('courseName', data.courseName);
    formData.append('courseDescription', data.courseDescription);
    formData.append('courseCredit', data.courseCredit);

    courseService.updateCourse(formData, idUpdate)
      .then((res) => {
        if (res.data.success == true) {
          toast.success('Course Updated successfully!', {
            position: toast.POSITION.TOP_RIGHT
          })
          settabledata(
            tabledata.map(item =>
              item.courseId === idUpdate
                ? res.data.data[0]
                : item
            ))
          setShowUpdate(false);
        }
        else {
          if (res.data.data == "duplicateentry") {
            console.log("in if condition");
            toast.error('Course Name is already present!', {
              position: toast.POSITION.TOP_RIGHT
            })
          }
        }
      })
      .catch((err) => {
        toast.error('Try again!', {
          position: toast.POSITION.TOP_RIGHT
        })
        setShowUpdate(false);
      })
  };

  const handleCourseDelete = () => {
    courseService.deleteCourse(idDelete)
      .then((res) => {
        if (res.data.success == true) {
          toast.success('Course Deleted successfully!', {
            position: toast.POSITION.TOP_RIGHT
          })
          const temp = [...tabledata];
          temp.splice(itemNumber, 1);
          settabledata(temp);
          setShowDelete(false);
        }
      })
      .catch((err) => {
        toast.error('Try again!', {
          position: toast.POSITION.TOP_RIGHT
        })
        setShowDelete(false);
      })


  }

  const handleClose = () => {
    setShow(false);
  }

  const toggleTrueFalse = () => {
    setShow(true);
  }

  const ModalContent = () => {
    return (
      <Modal

        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Course
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <AddCoursesInput handelAddCourseSubmit={handelAddCourseSubmit} />

        </Modal.Body>

      </Modal>
    )
  }

  const handleCloseDelete = () => {
    setShowDelete(false);
    setIdDelete(null);
  }

  const toggleTrueFalseDelete = (id, itemNumber) => {
    setShowDelete(true);
    setIdDelete(id);
    setitemNumber(itemNumber);
  }

  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setIdUpdate(null);
  }

  const toggleTrueFalseUpdate = (id) => {
    setShowUpdate(true);
    setIdUpdate(id);
  }

  const UpdateModalContent = () => {
    return (
      <Modal

        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showUpdate}
        onHide={handleCloseUpdate}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Course Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <UpdateCourseInput courseId={idUpdate} handelUpdateCourseSubmit={handelUpdateCourseSubmit} />

        </Modal.Body>

      </Modal>
    )
  }

  const DeleteModalContent = () => {
    return (
      <Modal

        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showDelete}
        onHide={handleCloseDelete}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Course
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <p>Are you sure want to delete course?</p>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseDelete}>Close</Button>
          <Button onClick={handleCourseDelete}>Delete </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  return (
    <div style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "100vh" }}>
      <div style={{ backgroundImage: "linear-gradient(to right, #fa709a 0%, #fee140 100%) !important" }}>
        <Row style={{ alignContent: "center", justifyContent: "center" }}>
          <Col
            lg="12"
            md="12"
            sm="12"
            xs="12"
            className={`right ${classes.right}`}
          >
            <Card className="graphcard1" style={{ opacity: "1" }} className={classes.background}>
              <h5 className={classes.title}>All Courses
                <Col className='ml-auto' lg={3} md={3}>
                  <Form.Group className="mb-3" controlId="search">
                    <Form.Control type="serach" className={classes.input} placeholder="search" onChange={(event) => {
                      setsearchstr(event.target.value);
                      if (event.target.value.length > 2) {
                        setsearcheddata([...tabledata.filter(x => x.courseName.toLowerCase().includes(event.target.value.toLowerCase()))]);
                      }
                    }} />
                  </Form.Group>
                </Col>
                <Col className='ml-auto' lg={3} md={3} >
                  <Button  className={`${classes.btnsubmit} ${classes.addButton} ` } onClick={() => toggleTrueFalse()}
                  >
                    Add Course
                  </Button>
                </Col>
                {show ? <ModalContent /> : null}
                {showUpdate ? <UpdateModalContent /> : null}
                {showDelete ? <DeleteModalContent /> : null}
              </h5>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table" className={classes.background}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Index</TableCell>
                      <TableCell align="center">Image</TableCell>
                      <TableCell align="center">Course Name</TableCell>
                      <TableCell align="center">Course Description</TableCell>
                      <TableCell align="center">Update</TableCell>
                      <TableCell align="center">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      (searchstr && searchstr.length > 2) ?
                        (
                          searcheddata.map((t, itemNumber) => {
                            return (
                              <TableRow key={t.courseId}>
                                <TableCell component="th" scope="row" align="center">
                                  {itemNumber + 1}
                                </TableCell>
                                <TableCell align="center"><img alt={t.courseName} style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "50px" }} src={`https://csci-5709-nodejs.herokuapp.com/${t.thumbnail}`} /> </TableCell>
                                <TableCell align="center">{t.courseName}</TableCell>
                                <TableCell align="center">{t.courseDescription}</TableCell>
                                <TableCell align="center">  <Button className={classes.editButton} style={{ backgroundColor: "#00FF00", borderColor: "#00FF00", hover: "00A300", boxShadow: "0px 2px 3px black" }} onClick={() => toggleTrueFalseUpdate(t.courseId)}>
                                  <FaPen />
                                </Button>
                                </TableCell>
                                <TableCell align="center"> <Button className={classes.deleteButton} style={{ backgroundColor: "#FF0000", borderColor: "#FF0000", hover: "00A300", boxShadow: "0px 2px 3px black" }} onClick={() => toggleTrueFalseDelete(t.courseId, itemNumber)}>
                                  <AiFillDelete />
                                </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })
                        ) :
                        (
                          tabledata.map((t, itemNumber) => {
                            return (
                              <TableRow key={t.courseId}>
                                <TableCell component="th" scope="row" align="center">
                                  {itemNumber + 1}
                                </TableCell>
                                <TableCell align="center"><img style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "50px" }} src={`https://csci-5709-nodejs.herokuapp.com/${t.thumbnail}`} /> </TableCell>
                                <TableCell align="center">{t.courseName}</TableCell>
                                <TableCell align="center">{t.courseDescription}</TableCell>
                                <TableCell align="center">  <Button className={classes.editbutton} style={{ backgroundColor: "#00FF00", borderColor: "#00FF00", hover: "00A300", boxShadow: "0px 2px 3px black" }} onClick={() => toggleTrueFalseUpdate(t.courseId)}>
                                  <FaPen />
                                </Button>
                                </TableCell>
                                <TableCell align="center"> <Button className={classes.deleteButton} style={{ backgroundColor: "#FF0000", borderColor: "#FF0000", hover: "00A300", boxShadow: "0px 2px 3px black" }} onClick={() => toggleTrueFalseDelete(t.courseId, itemNumber)}>
                                  <AiFillDelete />
                                </Button>
                                </TableCell>
                              </TableRow>
                            )
                          })
                        )
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Courses
