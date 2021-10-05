import axios from 'axios';

const loginUser= (logincredentials)=>{
    return axios.post("https://csci-5709-nodejs.herokuapp.com/api/login",logincredentials)
}

export default {
    loginUser,
}
