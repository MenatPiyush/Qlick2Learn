
//Author Nirmal Bhimani B00878753
import axios from 'axios';

const getFAQS = () => {
    return axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/getFAQS");
}

const getFAQ = (faqId) => {
    return   axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/getFAQ/" + faqId)
}

const addFAQ= (question , answer) => {
    return axios.post('https://csci-5709-nodejs.herokuapp.com/api/expert/addFAQ', {
        question: question,
        answer: answer
      })
}

const updateFAQ = (question , answer ,idUpdateFAQ) => {
    return axios.put('https://csci-5709-nodejs.herokuapp.com/api/expert/updateFAQ/' + idUpdateFAQ, {
        question: question,
        answer: answer
      })
}

const deleteFAQ = (idDelete) => {
    return  axios({
        method: "delete",
        url: "https://csci-5709-nodejs.herokuapp.com/api/expert/deleteFAQ/" + idDelete,
      })
}

export default {
    getFAQS,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    getFAQ
}