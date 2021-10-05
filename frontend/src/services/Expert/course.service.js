//Author Nirmal Bhimani B00878753
import axios from 'axios';

const getCourses = () => {
    return axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/getCourses");
}

const getCourse = (courseId) => {
    return  axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/getCourse/" + courseId);
}

const addCourse= (formData) => {
    return  axios({
        method: "post",
        // https://csci-5709-nodejs.herokuapp.com
        url: "https://csci-5709-nodejs.herokuapp.com/api/expert/addCourse",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
}

const updateCourse = (formData , idUpdate) => {
    return axios({
        method: "put",
        url: "https://csci-5709-nodejs.herokuapp.com/api/expert/updateCourse/"+idUpdate ,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      })
}

const deleteCourse = (idDelete) => {
    return  axios({
        method: "delete",
        url: "https://csci-5709-nodejs.herokuapp.com/api/expert/deleteCourse/"+idDelete,
      })
}



export default {
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourse
}