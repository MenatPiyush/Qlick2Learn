import React , { useState }  from 'react';
import PrivateSection from './PrivateSection';
import PublicSection from './PublicSection';
import "../../node_modules/jquery/dist/jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap"

const Routes = () => {
    if(localStorage.getItem("isUserLoggedin") === 'true' && localStorage.getItem("token") != null && localStorage.getItem("UserId") != null )
    {
        return <PrivateSection/>;
    }else if(localStorage.getItem("isUserLoggedin") === 'false'){
        localStorage.clear();
        return <PublicSection/>;
    }else{
        localStorage.clear();
        return <PublicSection/>;
    }
}
export default Routes;