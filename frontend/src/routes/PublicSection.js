import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../components/Public/Login/login';
import PublicNavbar from '../components/Public/NavBar/Navbar';
import Signup from '../components/Public/Signup/signup';
import HomePage from '../components/Public/Homepage/HomePage';
import PageNotFound  from '../components/Public/PageNotFound/PageNotFound';


const PublicSection = () => {
    return ( <div>
            <PublicNavbar></PublicNavbar>
                <Switch>
                    <Route path="/login" exact component={Login}>
                        <Login></Login>
                    </Route>
                    <Route path="/signup" exact component={Signup}>
                        <Signup></Signup>
                    </Route>
                    <Route path="/" exact component={HomePage}>
                        <HomePage></HomePage>
                    </Route>
                    
            </Switch> 
        </div>
    );
}
 
export default PublicSection;