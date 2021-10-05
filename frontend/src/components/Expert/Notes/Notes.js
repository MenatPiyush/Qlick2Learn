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

import { FaPen } from "react-icons/fa";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddNotesInput from './AddNotesInput';
import UpdateNotesInput from './UpdateNotesInput';
import QuillEditor from '../Editor/QuillEditor';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewNotesInput from './ViewNotesInput';
import notesService from '../../../services/Expert/notes.service';
import courseServie from '../../../services/Expert/course.service';

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
    }
  },
  deleteButton: {
    '&:focus': {
      backgroundColor: 'rgb(255, 0, 0) !important',
      borderColor: 'rgb(255, 0, 0) !important',
      color: "#ffffff !important"
    },
  },
  viewButton: {
    '&:focus': {
      backgroundColor: '#007bff !important',
      borderColor: '#007bff !important',
      color: "#ffffff !important"
    },
  },
  background: {
    background: "linear-gradient(to right, #fa709a 0%, #fee140 100%) !important"
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
}));

function Notes(props) {
  const classes = useStyles();

  const [tabledata, settabledata] = useState([]);
  const [searchstr, setsearchstr] = useState("");
  const [searcheddata, setsearcheddata] = useState([]);


  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);


  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [idNote, setIdNote] = useState(null);


  const [showNoteUpdateModal, setShowNoteUpdateModal] = useState(false);
  const [showNoteUpdate, setShowNoteUpdate] = useState(false);
  const [idNoteUpdate, setIdNoteUpdate] = useState(null);


  const [showNoteDeleteModal, setShowNoteDeleteModal] = useState(false);
  const [showNoteDelete, setShowNoteDelete] = useState(false);
  const [idNoteDelete, setIdNoteDelete] = useState(null);
  const [itemNumber, setitemNumber] = useState(null);

  const [courseData, setCourseData] = useState(null);

  const handelAddCourseSubmit = (data, status) => {
    if (status) {
      settabledata([...tabledata, data]);
      setShow(false);
    }
  }

  useEffect(() => {
    courseServie.getCourses()
      .then(res => {
        setCourseData(res.data.data);
      }).catch(err => console.log("Err is", err))
  }, [])


  useEffect(() => {
    notesService.getNotes().then(res => {
      settabledata(res.data.data);
      setsearcheddata(res.data.data);
    }).catch(err => console.log("Err is", err))
  }, [])


  const handleClose = () => {
    setShow(false);
    setId(null);
  }

  const handleShow = () => {
    setShow(true);
  }

  const toggleTrueFalse = () => {
    setShowModal(handleShow)
    setId(id);
  }


  const handleCloseNote = () => {
    setShowNote(false);
    setIdNote(null);
  }


  const handleShowNote = (id) => {
    setIdNote(id);
    setShowNote(true);
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
            Add Notes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNotesInput courseData={courseData} handelAddCourseSubmit={handelAddCourseSubmit} />
        </Modal.Body>
      </Modal>
    )
  }

  const ShowNoteModalContent = () => {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showNote}
        onHide={handleCloseNote}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Note
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ViewNotesInput id={idNote} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseNote}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const handleCloseNoteUpdate = () => {
    setShowNoteUpdate(false);
    setIdNoteUpdate(null);
  }

  const toggleTrueFalseNoteUpdate = (id, itemNumber) => {
    setShowNoteUpdate(true);
    setIdNoteUpdate(id);
  }

  const handleCloseNoteDelete = (id, itemNumber) => {
    setShowNoteDelete(false);
    setIdNoteDelete(id);
  }

  const handleNoteDelete = () => {
    notesService.deleteNote(idNoteDelete)
      .then((res) => {
        if (res.data.success == true) {
          toast.success('Note Deleted successfully!', {
            position: toast.POSITION.TOP_RIGHT
          })
          const temp = [...tabledata];
          temp.splice(itemNumber, 1);
          settabledata(temp);
          setShowNoteDelete(false);
        }
      })
      .catch((err) => {
        toast.error('Try again!', {
          position: toast.POSITION.TOP_RIGHT
        })
        setShowNoteDelete(false);
      })
  }

  const toggleTrueFalseNoteDelete = (id) => {
    setShowNoteDelete(true);
    setIdNoteDelete(id);
    setitemNumber(itemNumber);
  }

  const ShowNoteUpdateModalContent = () => {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showNoteUpdate}
        onHide={handleCloseNoteUpdate}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Updates Notes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateNotesInput courseData={courseData} id={idNoteUpdate} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseNoteUpdate}>Close</Button>
          <Button onClick={handleCloseNoteUpdate}>Update Notes</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const ShowNoteDeleteModalContent = () => {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showNoteDelete}
        onHide={handleCloseNoteDelete}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Note
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete this Note ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseNoteDelete}>Close</Button>
          <Button onClick={handleNoteDelete}>Delete Notes</Button>
        </Modal.Footer>
      </Modal>
    )
  }


  return (
    <div style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "100vh" }}>
      <Row style={{ alignContent: "center", justifyContent: "center" }}>
        <Col
          lg="12"
          md="12"
          sm="12"
          xs="12"
          className={`right ${classes.right}`}
        >
          <Card className="graphcard1" style={{ opacity: "1" }} className={classes.background}>
            <h5 className={classes.title}>All Notes
              <Col className='ml-auto' lg={3} md={3}>
                <Form.Group className="mb-3" controlId="search">
                  <Form.Control type="serach" className={classes.input} placeholder="search" onChange={(event) => {
                    setsearchstr(event.target.value);
                    if (event.target.value.length > 2) {
                      setsearcheddata([...tabledata.filter(x => (x.notesName.toLowerCase().includes(event.target.value.toLowerCase()) || x.notesTitle.toLowerCase().includes(event.target.value.toLowerCase())) || x.courseName.toLowerCase().includes(event.target.value.toLowerCase()))]);
                    }
                  }} />
                </Form.Group>
              </Col>
              <Col className='ml-auto' lg={3} md={3} >
                <Button className={`${classes.btnsubmit} ${classes.addButton} ` } onClick={() => toggleTrueFalse()}
                >
                  Add Notes
                </Button>
              </Col>
              {show ? <ModalContent /> : null}
              {showNote ? <ShowNoteModalContent></ShowNoteModalContent> : null}
              {showNoteUpdate ? <ShowNoteUpdateModalContent /> : null}
              {showNoteDelete ? <ShowNoteDeleteModalContent /> : null}
            </h5>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table" style={{ opacity: "1" }} className={classes.background}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Index</TableCell>
                    <TableCell align="center">Course Name</TableCell>
                    <TableCell align="center">Notes Name</TableCell>
                    <TableCell align="center">Course Description</TableCell>
                    <TableCell align="center">View</TableCell>

                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    (searchstr && searchstr.length > 2) ?
                      (
                        searcheddata.map((t, itemNumber) => {
                          return (
                            <TableRow key={itemNumber}>
                              <TableCell component="th" scope="row" align="center">
                                {itemNumber + 1}
                              </TableCell>
                              <TableCell align="center">{t.courseName} </TableCell>
                              <TableCell align="center">{t.notesName}</TableCell>
                              <TableCell align="center">{t.courseDescription}</TableCell>
                              <TableCell align="center">  <Button className={classes.viewButton} style={{ boxShadow: "0px 2px 3px black" }} onClick={() => handleShowNote(t.idnotes)}
                              >
                                <AiOutlineEye />
                              </Button> </TableCell>

                              <TableCell align="center"> <Button className={classes.deleteButton} style={{ backgroundColor: "#FF0000", borderColor: "#FF0000", hover: "00A300", boxShadow: "0px 2px 3px black" }} onClick={() => toggleTrueFalseNoteDelete(t.idnotes, itemNumber)}>
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
                            <TableRow key={itemNumber}>
                              <TableCell component="th" scope="row" align="center">
                                {itemNumber + 1}
                              </TableCell>
                              <TableCell align="center">{t.courseName} </TableCell>
                              <TableCell align="center">{t.notesName}</TableCell>
                              <TableCell align="center">{t.courseDescription}</TableCell>
                              <TableCell align="center">  <Button className={classes.viewButton} style={{ boxShadow: "0px 2px 3px black" }} onClick={() => handleShowNote(t.idnotes)}
                              >
                                <AiOutlineEye />
                              </Button> </TableCell>

                              <TableCell align="center"> <Button className={classes.deleteButton} style={{ backgroundColor: "#FF0000", borderColor: "#FF0000", hover: "00A300", boxShadow: "0px 2px 3px black" }} onClick={() => toggleTrueFalseNoteDelete(t.idnotes, itemNumber)}>
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
  )
}

export default Notes
