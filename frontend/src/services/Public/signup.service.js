import axios from 'axios';

const signupUser= (signupcredentials)=>{
    return axios.post("https://csci-5709-nodejs.herokuapp.com/api/signup",signupcredentials)
}

export default {
    signupUser,
}
