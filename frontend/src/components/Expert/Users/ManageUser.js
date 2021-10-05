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
import { FaCreativeCommonsPd, FaCreativeCommonsSa } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UserStatistics from './UserStatistics';
import userService from '../../../services/Expert/userStatistics.service';

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
  background: {
    background: "linear-gradient(to right, #fa709a 0%, #fee140 100%) !important"
  }
}));

function ManageUser(props) {

  const classes = useStyles();

  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  const [tabledata, settabledata] = useState([]);
  const [searchstr, setsearchstr] = useState("");
  const [searcheddata, setsearcheddata] = useState([]);
  const [issearched, setissearched] = useState(false);

  const [userdata, setUserData] = useState();

  const handleClose = () => {
    setShow(false);
    setId(null);
  }

  const toggleTrueFalse = (id) => {
    setShow(true);
    setId(id);
  }

  useEffect(() => {
    userService.getUser().then(res => {
      settabledata(res.data.data)
      setsearcheddata(res.data.data);
    }).catch(err => console.log("Err is", err))
  }, [])

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
            User Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserStatistics userId={id} ></UserStatistics>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const activate = (id) => {
    userService.activateUser(id).then(res => {
      settabledata(
        tabledata.map(item =>
          item.id === id
            ? res.data.data[0]
            : item
        ))
    }).catch(err => console.log("Err is", err))
  }

  const deactivate = (id) => {
    userService.deactivateUser(id).then(res => {
      settabledata(
        tabledata.map(item =>
          item.id === id
            ? res.data.data[0]
            : item
        ))
    }).catch(err => console.log("Err is", err))
  }

  return (
    <div style={{ overflowY: "auto", overflowX: "hidden", maxHeight: "100vh" }}>
      <Row >
        <Col
          lg="12"
          md="12"
          sm="12"
          xs="12"
          className={`right ${classes.right}`}
        >
          {show ? <ModalContent /> : null}
          <Card className="graphcard1" style={{ opacity: "1" }} className={classes.background}>
            <h5 className={classes.title}>All Users
              <Col className='ml-auto' lg={3} md={3}>
              </Col>
              <Col className='ml-auto' lg={3} md={3} >
                <Form.Group className="mb-3" controlId="search">
                  <Form.Control type="serach" className={classes.input} placeholder="search" onChange={(event) => {
                    setsearchstr(event.target.value);
                    if (event.target.value.length > 2) {
                      setsearcheddata([...tabledata.filter(x => x.firstname.toLowerCase().includes(event.target.value.toLowerCase()) || x.lastname.toLowerCase().includes(event.target.value.toLowerCase()) || x.email.toLowerCase().includes(event.target.value.toLowerCase()))]);
                    }
                  }} />
                </Form.Group>
              </Col>
            </h5>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table" style={{ opacity: "1" }} className={classes.background}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Index</TableCell>
                    <TableCell align="center">First Name</TableCell>
                    <TableCell align="center">Last Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Enable/Disable</TableCell>
                    <TableCell align="center">See Statistics</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    (searchstr && searchstr.length > 2) ?
                      (
                        searcheddata.map((t, itemNumber) => {
                          return (
                            <TableRow key={t.id}>
                              <TableCell component="th" scope="row" align="center">
                                {itemNumber + 1}
                              </TableCell>
                              <TableCell align="center">{t.firstname} </TableCell>
                              <TableCell align="center"> {t.lastname} </TableCell>
                              <TableCell align="center">{t.email}</TableCell>
                              {
                                t.active == "1" ? <TableCell align="center">  <Button className={classes.editButton} style={{ backgroundColor: "#00FF00", borderColor: "#00FF00", hover: "00A300", boxShadow: "0px 2px 3px black" }} onClick={() => deactivate(t.id)}  >
                                  <FaCreativeCommonsSa />
                                </Button>
                                </TableCell> : <TableCell align="center">  <Button className={classes.editButton} style={{ backgroundColor: "#FF0000", borderColor: "#FF0000", hover: "00A300", boxShadow: "0px 2px 3px black" }} onClick={() => activate(t.id)} >
                                  <FaCreativeCommonsPd />
                                </Button>
                                </TableCell>
                              }
                              <TableCell align="center"> <Button onClick={() => toggleTrueFalse(t.id)}  >
                                <AiOutlineEye />
                              </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) :
                      (
                        tabledata.map((t, itemNumber) => {
                          return (
                            <TableRow key={t.id}>
                              <TableCell component="th" scope="row" align="center">
                                {itemNumber + 1}
                              </TableCell>
                              <TableCell align="center">{t.firstname}</TableCell>
                              <TableCell align="center"> {t.lastname} </TableCell>
                              <TableCell align="center">{t.email}</TableCell>
                              {
                                t.active == "1" ? <TableCell align="center">  <Button className={classes.editButton} style={{ backgroundColor: "#00FF00", borderColor: "#00FF00", hover: "00A300", boxShadow: "0px 2px 3px black" }} onClick={() => deactivate(t.id)}  >
                                  <FaCreativeCommonsSa />
                                </Button>
                                </TableCell> : <TableCell align="center">  <Button className={classes.editButton} style={{ backgroundColor: "#FF0000", borderColor: "#FF0000", hover: "00A300", boxShadow: "0px 2px 3px black" }} onClick={() => activate(t.id)}  >
                                  <FaCreativeCommonsPd />
                                </Button>
                                </TableCell>
                              }
                              <TableCell align="center"> <Button onClick={() => toggleTrueFalse(t.id)}  >
                                <AiOutlineEye />
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

export default ManageUser
