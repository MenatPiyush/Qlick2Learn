import axios from 'axios';

const userProfile= (userId)=>{
    return axios.post("http://localhost:3001/api/myprofile/"+userId);
}

const editProfile= (userId)=>{
    return axios.post("https://csci-5709-nodejs.herokuapp.com/api/myprofile/"+userId);
}

export default {
    userProfile,
    editProfile
}