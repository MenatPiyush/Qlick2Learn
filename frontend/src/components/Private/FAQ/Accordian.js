
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import { GrUserExpert } from 'react-icons/gr';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Wrap = styled.div`
  color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const Dropdown = styled.div`
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const Accordion = () => {
  const [clicked, setClicked] = useState(false);

  const [tableData, setTableData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get("https://csci-5709-nodejs.herokuapp.com/api/expert/getFAQS").then(res => {
      setTableData(res.data.data);
    }).catch(err => console.log("Err is", err))
  }, [])

  const toggle = index => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }
    setClicked(index);
  };

  const redirectTO = (path) => {
    history.push(path);
  }

  return (
    <div style={{  overflow: "auto", maxHeight: "100vh"  }}>
    <IconContext.Provider value={{ color: '#000000', size: '25px' }}>
      <div className='accordian-section' style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }} >
        <div className='conatiner' style={{  top: '20%', width: '50%', boxShadow: '2px 10px 35px 1px rgba(153, 153, 153, 0.3)' }}>
          <h1 style={{ fontSize: '2rem', textAlign: 'center', color: '#000000', padding: '1%' }}>
            FAQ:
          </h1>
          {tableData.map((item, index) => {
            return (
              <>
                <Wrap onClick={() => toggle(index)} key={index}>
                  <h2 className='item-question' style={{ fontSize: '1rem', padding: '1.5%', textAlign: 'left' }}>
                    {item.question}
                  </h2>
                  <span className='icon-span' style={{ marginRight: '1.5rem' }}>
                    {clicked === index ? <FiMinusCircle /> : <FiPlusCircle />}
                  </span>
                </Wrap>
                {clicked === index ? (
                  <Dropdown className='dropdown'>
                    <p className='answer' style={{ fontSize: '1rem', wordWrap: 'break-word', padding: '1.5%' }}>
                      {item.answer}
                    </p>
                  </Dropdown>
                ) : null}
              </>
            );
          })}
          <h4 style={{ textAlign: 'center', padding: '1%' }}>
            Did not find what you are looking for !
            <br />
            Ask an <a className="expert-link" style={{cursor: "pointer" ,color : "#007bff"}} onClick={() => redirectTO("/expert") }>Expert  <GrUserExpert /> </a>
          </h4>
        </div>
      </div>
    </IconContext.Provider>

    </div>
  );
};

export default Accordion;
