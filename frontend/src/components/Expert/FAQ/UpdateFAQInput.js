// Author Nirmal Bhimani B00878753
import React, { useState, useEffect } from "react";
import {
    Form,
    Button
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import { faqQuestion, faqAnswer } from './faqValidation';
import faqService from '../../../services/Expert/faq.service';

const useStyles = makeStyles((theme) => ({
   
    input: {
        color: '#000',
        fontSize: 12,
        textTransform: "capitalize",
        fontWeight: 500,
        height: '50px',
        '&::placeholder': {
            textTransform: "capitalize",
        },
    }
}));

const UpdateFAQInput = ({ handelUpdateNotesSubmit, faqId }) => {
    const classes = useStyles();

    const [faq, setFAQ] = useState({ question: "", answer: "" })
    const [formErrForUpdate, setFormErrsForUpdate] = useState({ errorForFAQQuestion: "", errorForFAQAnswer: "" });
    const [buttonDisabled, setbuttonDisabled] = useState(true);

    useEffect(() => {
        faqService.getFAQ(faqId)
            .then(res => {
                setFAQ(res.data.data[0]);
            }).catch(err => console.log("Err is", err))
    }, [])

    function handleChange(e) {
        e.preventDefault();
        setbuttonDisabled(false);
        const { id, value } = e.target;
        switch (id) {
            case 'FAQQuestion':
                if (faqAnswer(value)) {
                    setFormErrsForUpdate({ ...formErrForUpdate, errorForFAQQuestion: "*Notes Title is required" })
                }
                else {
                    delete formErrForUpdate.errorForFAQQuestion
                }
                setFAQ({ ...faq, question: value })
                break;
            case 'FAQAnswer':
                if (faqAnswer(value)) {
                    setFormErrsForUpdate({ ...formErrForUpdate, errorForFAQAnswer: "*Notes Description is required" })
                }
                else {
                    delete formErrForUpdate.errorForFAQAnswer
                }
                setFAQ({ ...faq, answer: value })
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Form.Group className="mb-3" controlId="FAQQuestion">
                <Form.Label>Question </Form.Label>
                <Form.Control type="select" className={classes.input} value={faq.question || ""} onBlur={handleChange} onChange={handleChange} autoComplete="off" />
                <small style={{ color: "red" }}>{formErrForUpdate.errorForFAQQuestion}</small>
            </Form.Group>
            <Form.Group className="mb-3" rows={3} controlId="FAQAnswer">
                <Form.Label>Answer  </Form.Label>
                <Form.Control type="text" rows={3} className={classes.input} value={faq.answer || ""} onBlur={handleChange} onChange={handleChange} autoComplete="off" />
                <small style={{ color: "red" }}>{formErrForUpdate.errorForFAQAnswer}</small>
            </Form.Group>
            <Form.Group className="mb-3" style={{ textAlign: "center" }} controlId="submit">
                <Button type="submit" onClick={() => handelUpdateNotesSubmit(faq)} disabled={buttonDisabled} >Update</Button>
            </Form.Group>
        </div>
    );
}

export default UpdateFAQInput;
