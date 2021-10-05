//Author Nirmal Bhimani B00878753
import axios from 'axios';

const getNotes = () => {
    return axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/getNotes");
}

const getNote = (id) => {
    return   axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/getNote/" + id);
}

const addNote= (formData) => {
   return  axios({
    method: "post",
    url: "https://csci-5709-nodejs.herokuapp.com/api/expert/addNotes" ,
    data: formData,
    })
}

const updateNote = (question , answer ,idUpdateFAQ) => {
   return axios.put('https://csci-5709-nodejs.herokuapp.com/api/expert/updateFAQ/' + idUpdateFAQ, {
        question: question,
        answer: answer
      })
}

const deleteNote = (idNoteDelete) => {
    return   axios({
        method: "delete",
        url: "https://csci-5709-nodejs.herokuapp.com/api/expert/deleteNote/"+idNoteDelete,
      })
}

export default {
    getNotes,
    addNote,
    updateNote,
    deleteNote,
    getNote
}