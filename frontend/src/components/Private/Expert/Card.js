
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { GrLinkedin, GrGithub } from 'react-icons/gr';
import { FaGitlab } from 'react-icons/fa';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { Grid, Container } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 350,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

export default function RecipeReviewCard() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/getExpertDetails").then(res => {
      setTableData(res.data.data);
    }).catch(err => console.log("Err is", err))
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlelingClick = () => {
    setSnackOpen(true);
  };

  const handlelingClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };


  return (
    <Container>
      <div>
      <input className='search-field' fullWidth margin='normal' type='text' placeholder='Search Here'
        style={{ padding: '10px', marginTop: '2%', marginBottom: '2%', fontSize: '18px', width: '97%' }} onChange={(event) => {
          setSearchTerm(event.target.value);
        }} />
      <Grid className={classes.container} container alignItems='stretch' spacing={4}>
        {tableData.filter((val) => {
          if (searchTerm === "") {
            return val
          } else if (val.expertName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
          } else if (val.expertSME.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
          } else if (val.expertEmail.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
          }
        }).map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <Card className={classes.root} key={index}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label='name' className={classes.avatar}>
                        {item.expertInitial}
                      </Avatar>
                    }
                    title={item.expertName}
                    subheader={item.expertDateOfJoining}
                  />
                  <CardContent>
                    <Typography variant='body2'>
                      SME: {item.expertSME}
                      <br />
                      Experience: {item.expertExperience} yrs
                    </Typography>
                    <Typography variant='body1' color='primary'>
                      <br />
                      <div onClick={handleClickOpen} style={{ cursor: 'pointer' }}>{item.expertEmail}</div>
                    </Typography>
                  </CardContent>
                  <IconButton aria-label='linkedin' href={item.expertLinkedInLink} target='blank' >
                    <GrLinkedin />
                  </IconButton>
                  <IconButton aria-label='github' href={item.expertGitHubLink} target='blank'>
                    <GrGithub />
                  </IconButton>
                  <IconButton aria-label='gitlab' href={item.expertGitLabLink} target='blank'>
                    <FaGitlab />
                  </IconButton>
                </Card>

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'
                >
                  <DialogTitle id='alert-dialog-title'>{'Do you want to send an email to this Expert?'}</DialogTitle>
                  <DialogActions>
                    <Button onClick={handlelingClick} color='primary'>
                      Yes
                    </Button>
                    <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handlelingClose}>
                      <Alert onClose={handlelingClose} severity='success'>
                        Email sent successfully !
                      </Alert>
                    </Snackbar>
                    <Button onClick={handleClose} color='primary'>
                      No
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Grid>
          );
        })}
      </Grid>
      </div>
    </Container>
  );
}
