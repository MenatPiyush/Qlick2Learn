import React, { Component , useState  } from 'react';
import loginService from '../../../services/Public/login.service';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

toast.configure()

const Login = () => {

    const [user,setUser] = useState();
    const history = useHistory();

    function handleChange(e){
        const {id, value} = e.target;
        switch(id){
            case 'email':
                setUser({...user,email: value})
                break;

            case 'password':
                setUser({...user,password: value})
                break;
        }
    }

    function handlelogin(){
        loginService.loginUser(user).then((response)=>{
            if(response.data.success === true && response.data.message === "Logged IN"){
                toast.success("Logged IN",{position: toast.POSITION.TOP_RIGHT});
                localStorage.clear();
                localStorage.setItem("isUserLoggedin",true);
                localStorage.setItem("token",response.data.data.token);
                localStorage.setItem('UserId',response.data.data.id);
                localStorage.setItem("Role",response.data.data.role);
                if(response.data.data.role == "2"){
                    history.push("/expert/users");
                }
                else {
                    history.push("/mycourse");
                }
               
                window.location.reload();    
            }
        }).catch((error) => {
            toast.error(error.response.data.message,{position: toast.POSITION.TOP_RIGHT});
            history.push("/login");
        });
    }

    
    const redirectTO = (path) => {
        history.push(path);
    }

    return ( <div className="row justify-content-center" >
    <div className="col-xl-3 col-md-4 col-sm-6 col-12">
        <h1 className="text-center mt-5">Login</h1>
        <div className="mt-4">
            <div>
                <div className="form-group">
                    <input type="text" className="form-control" id="email" placeholder="Email" onChange={handleChange}/>
                    <small id="emailHelp" className="form-text text-danger"></small>
                </div>
                <div className="form-group ">
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={handleChange}/>
                    <small id="passwordHelp" className="form-text text-danger"></small>
                </div>
                <div className="text-center mt-5">
                    <button type="submit" className="btn btn-primary" onClick={handlelogin} placeholder="Submit">Submit</button>
                </div>
                <div className="text-center mt-5 ">
                    <p className="mb-sm-0">Forgot Password ?... <a style={{cursor: "pointer" ,color : "#007bff"}} onClick={() => redirectTO("/signup")}>Click Here</a></p>
                </div>    
                <div className="text-center">
                    <p>Don't Have an Account ?... <a  style={{cursor: "pointer" ,color : "#007bff"}} onClick={() => redirectTO("/signup")}>Register Here</a></p>
                </div>
            </div>
        </div>
    </div>
</div> );
}
 
export default Login;