import BuyCourseCard from './buycoursecard';
import { CardDeck } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import './buycourse.css';

function BuyCourse() {
    return (
        <div>
            
            <div style={{  overflowY: "auto", overflowX: "hidden",  maxHeight: "100vh"  }}>
                <div class="row" style= {{textAlign: "center" , justifyContent:"center"}}>  <h2>Trending Courses</h2></div>
           
            <CardDeck id="topic2">
                <BuyCourseCard />
            </CardDeck>
            </div>
        </div>

    );
}

export default BuyCourse;