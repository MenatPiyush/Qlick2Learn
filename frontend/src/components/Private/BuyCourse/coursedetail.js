import './coursedetail.css'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import imagel from './test1.jpg';
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function CourseDetail() {

    const location = useLocation();
    const history = useHistory();
    const [details, setDetails] = useState([]);
    const [name, setName] = useState();
    const [des, setDes] = useState();
    const [price, setPrice] = useState();
    const [image, setImage]= useState();
    const userid = localStorage.getItem("UserId");

    const [snackOpen, setSnackOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);


    function Alert(props) {
        return <MuiAlert elevation={6} variant='filled' {...props} />;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlelingClose = () => {
        history.push('/buycourse')
        setSnackOpen(false);
    };


    useEffect(() => {
        console.log(location.state.detail)
        axios.get(`https://csci-5709-nodejs.herokuapp.com/api/student/getCourses/${location.state.detail}`).then(res => {

            setDetails(res.data.data);
            setName(details[0].courseName);
            setDes(details[0].courseDescription);
            setPrice(details[0].courseCredit);
            setImage(details[0].thumbnail)
        }).catch(err => console.log("Err is", err))
    });

    async function buyCourse() {

        axios.post(`https://csci-5709-nodejs.herokuapp.com/api/student/buyCourse`, { "courseid": location.state.detail, "userid": userid, "coursename": name, "image": image }).then(res => {
            console.log(res.data);
        }).catch(err => console.log("Err is", err))
        setSnackOpen(true);
    };

    return (
        <div id="coursedetail" >
            <Card id="card" style={{ width: '60rem' }}>
                <Card.Img id="img" src={`https://csci-5709-nodejs.herokuapp.com/${image}`} />
                <Card.Body id="text1">
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {des}
                    </Card.Text>
                </Card.Body>
                <Card.Body id="text1">
                    <div>Rating: 3.5</div><br />
                    <div>Expert: Adam Williams</div><br />
                    <div>Badge: Yes</div><br />
                    <div>Price: {price}</div><br />
                    <div>Award: 50</div><br />
                </Card.Body>
                <Card.Body id="text1">
                    <Button id="button" onClick={handleClickOpen}>Buy Course</Button>
                </Card.Body>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{`Do you want to purchase the course for ${price} credits?`}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => { buyCourse() }} color='primary'>
                        Yes
                    </Button>
                    <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handlelingClose}>
                        <Alert onClose={handlelingClose} severity='success'>
                            Course bought!!
                        </Alert>
                    </Snackbar>
                    <Button onClick={handleClose} color='primary'>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default CourseDetail;
