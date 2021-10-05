// Author Nirmal Bhimani B00878753
import React , {useState} from "react";
import {
    Form,
    Button
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import {faqQuestion , faqAnswer} from './faqValidation';


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
    },
}));


const AddFAQInput = ({ handelAddFAQSubmit }) => {

    const classes = useStyles();

    const [faq, setFAQ] = useState()
    const [formErrForInsert, setFormErrsForInsert] = useState({errorForFAQQuestion : "" , errorForFAQAnswer : ""});

    function handleChange(e) {
        e.preventDefault();
        const { id, value } = e.target;

        switch (id) {
            case 'FAQQuestion':
                if (faqQuestion(value)) {
                    setFormErrsForInsert({ ...formErrForInsert, errorForFAQQuestion: "*FAQ Question is required" })
                }
                else {
                    delete formErrForInsert.errorForFAQQuestion
                }
                setFAQ({ ...faq, FAQQuestion: value })
                break;
            case 'FAQAnswer':
                if (faqAnswer(value)) {
                    setFormErrsForInsert({ ...formErrForInsert, errorForFAQAnswer: "*FAQ Answer is required" })
                }
                else {
                    delete formErrForInsert.errorForFAQAnswer
                }
                setFAQ({ ...faq, FAQAnswer: value })
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Form.Group className="mb-3" controlId="FAQQuestion">
            <Form.Label>Question </Form.Label>
            <Form.Control type="select" className={classes.input} placeholder="Question"  onBlur={handleChange} onChange={handleChange} />
            <small style={{ color: "red" }}>{formErrForInsert.errorForFAQQuestion}</small>
          </Form.Group>
          <Form.Group className="mb-3" rows={3} controlId="FAQAnswer">
            <Form.Label>Answer  </Form.Label>
            <Form.Control type="text" rows={3} className={classes.input} placeholder="Answer " onBlur={handleChange} onChange={handleChange} />
            <small style={{ color: "red" }}>{formErrForInsert.errorForFAQAnswer}</small>
          </Form.Group>
          <Form.Group className="mb-3" style= {{textAlign: "center"}} controlId="submit">
            <Button type="submit" onClick={(e) => handelAddFAQSubmit(e ,faq)} disabled={Object.entries(formErrForInsert || {}).length >0} >Submit</Button>
          </Form.Group>
        </div>
    );
}

export default AddFAQInput;
