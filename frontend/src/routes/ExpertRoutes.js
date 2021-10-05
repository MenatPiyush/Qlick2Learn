import React, { Component } from 'react';
import {Route } from 'react-router-dom';
import Expert from '../components/Expert';
import Layout from '../components/Expert/Layout/Layout'

// import  '../css/style.css'
const ExpertRoutes = () => {
    return (
             
<div>
        <Layout></Layout>
    </div>
        // <Route  path='/admin' render={()=>(<Route component={Expert} />)} />      
    );
}

export default ExpertRoutes;