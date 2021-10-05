
//Author Nirmal Bhimani B00878753
import axios from 'axios';

const userStatistics= (userId)=>{
    return axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/userDetail/"+userId);
}

const getUser = () => {
    return  axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/getUsers");
}

const activateUser = (id) => {
    return axios.put("https://csci-5709-nodejs.herokuapp.com/api/expert/activateUser/" + id)
}
const deactivateUser = (id) => {
    return  axios.put("https://csci-5709-nodejs.herokuapp.com/api/expert/deactivateUser/" + id)
}

export default {
    userStatistics,
    getUser,
    activateUser,
    deactivateUser 
}