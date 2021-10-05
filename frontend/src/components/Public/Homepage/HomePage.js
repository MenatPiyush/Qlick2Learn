import React, { Component, useState } from 'react';
import loginService from '../../../services/Public/login.service';
import { useHistory } from 'react-router-dom';
import head from '../../../assests/images/head.png';
import compass from '../../../assests/images/compass.png';
import certificate from '../../../assests/images/certificate.png';
import  './homepage.css';

import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { CardDeck } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
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


const Homepage = () => {

  const classes = useStyles();

  const history = useHistory();

  const redirectTo = (path) => {
    history.push(path);
  }

  return (<div >
    <div className="row" className= "fade-in-text" style={{ textAlign: "center" ,  alignContent: "center", justifyContent: "center", marginTop: "10px" }}>
      <h1>Learn At Last Moment</h1>
    </div>

    <div className="row" className= "fade-in-text"  style={{textAlign: "center" ,  alignContent: "center", justifyContent: "center", marginTop: "10px" }}>
      <h3>Expand Your carrer opportunities with Qlick2Learn</h3>
    </div>

   
    <div  className="row" className= "fade-in-text"  style={{ textAlign: "center" ,  alignContent: "center", justifyContent: "center", marginTop: "10px" }}>
      <h6 >Whether you are student or new learner, or doing freelancing work , 
        Qlick2Learn is one of the website which helps you to gain knowledge of different comupter courses.
    
          </h6>
    </div>
    
    <div  className="row" className= "fade-in-text"  style={{ textAlign: "center" ,  alignContent: "center", justifyContent: "center", marginTop: "10px" }}>
      <h6 > Qlick2Learn is tool to helps you gain basic to intermediate knowledge of course that you choose.
          </h6>
    </div>

    <div className="row"    style={{textAlign: "center" ,  alignContent: "center", justifyContent: "center", marginTop: "10px" }}>
    <Col  lg={2} md={2} >

        <Button className={`${classes.btnsubmit} ${classes.addButton} ${"fade-in-text"}`} onClick={() => redirectTo("/login")}>Login</Button>
        </Col>

        <Col  lg={2} md={2} >

<Button className={`${classes.btnsubmit} ${classes.addButton} ${"fade-in-text"} `} onClick={() => redirectTo("/signup")}>Register</Button>
</Col>
    </div>

    <CardDeck style= {{textAlign: "center" ,alignContent : "center" , justifyContent : "center"}} >
    <Card style={{ width: '15rem' , margin: "20px" , borderRadius : "125px" }} className="card1" className= "fade-in-text">
      <div classname= "row" style={{justifyContent : "center" , alignItems : "center" , display : "flex" , margin :"10px"}}>
      <Card.Img variant="top" src={compass} style={{maxWidth :"100px" , maxhegiht:"100px"}} />
      </div>
  <Card.Body>
    <Card.Title style={{textAlign: "center" , display : "flex" ,alignContent : "center" , justifyContent : "center"}}>Learn anything</Card.Title>
    <Card.Text style={{textAlign: "center" , display : "flex" ,alignContent : "center" , justifyContent : "center"}}>
    Explore any interest or trending topic, take prerequisites, and advance your skills
    </Card.Text>
  </Card.Body>
</Card>

<Card style={{ width: '15rem', margin: "20px"   , borderRadius : "125px" }} className="card1" className= "fade-in-text">
  <div classname= "row" style={{justifyContent : "center" , alignItems : "center" , display : "flex" , margin :"10px"}}>
  <Card.Img variant="top" src={head} style={{maxWidth :"100px" , maxhegiht:"100px"}}/>
  </div>
  
  <Card.Body>
    <Card.Title style={{textAlign: "center" , display : "flex" ,alignContent : "center" , justifyContent : "center"}}>Flexible learning</Card.Title>
    <Card.Text style={{textAlign: "center" , display : "flex" ,alignContent : "center" , justifyContent : "center"}}>
    Learn at your own pace, move between multiple courses, or switch to a different course
    </Card.Text>
  </Card.Body>
</Card>


<Card style={{ width: '15rem' , margin: "20px"  , borderRadius : "125px" }} className="card1" className= "fade-in-text">
  <div classname= "row" style={{justifyContent : "center" , alignItems : "center" , display : "flex" , margin :"10px"}}>
  <Card.Img variant="top" src={certificate} style={{maxWidth :"100px" , maxhegiht:"100px"}} />
  </div>
 
  <Card.Body>
    <Card.Title style={{textAlign: "center" , display : "flex" ,alignContent : "center" , justifyContent : "center"}}>Unlimited certificates</Card.Title>
    <Card.Text style={{textAlign: "center" , display : "flex" ,alignContent : "center" , justifyContent : "center"}}>
    Earn a certificate for every learning program that you complete at no additional cost
    </Card.Text>
  </Card.Body>
</Card>
      </CardDeck>
   
  </div>);
}

export default Homepage;