import React, { Component, useEffect, useState } from 'react';
import profileimg from '../../../assests/images/profileimg.jpeg'
import './profilepage.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';



const ProfilePage = () => {
    const userId = localStorage.getItem("UserId");
    console.log(userId);
    const [userProfile,setUserProfile] = useState({});
    const history = useHistory();

    useEffect(()=>{
        axios.get("https://csci-5709-nodejs.herokuapp.com/api/myprofile/"+userId).then((response)=>{
            if(response.data.success === true){
                console.log(response.data.data);
                setUserProfile(response.data.data);
                }
        }).catch((error) => {
            toast.error(error.response.data.message,{position: toast.POSITION.TOP_RIGHT});
            history.push("/");
        });
    },[])

    function handleeditprofile(){
        toast.success("Profile Editted Succesfully",{position: toast.POSITION.TOP_RIGHT});

    }
    

    return ( 
    <div className="container profile-page">
        <div className="row">
            <div className="col-md-3 col-sm-12">
                <div className="profile-img">
                    <img src={profileimg} alt=""></img>
                </div>
            </div>
            <div className="col-md-7 col-sm-9">
                <div className="profile-head">
                    <h5>{userProfile.firstname}&nbsp;{userProfile.lastname}</h5>
                    <h6>Web Developer and Designer</h6>
                    <p className="proile-rating">Total Experience : {userProfile.totalExperience}<span>Years</span></p>
                    
                </div>
            </div>
            <div className="col-md-2 col-sm-3">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#edit-modal" >Edit Profile</button>
            </div>
        </div>
        <div className="row">
            <div className="col-md-3">
                <div className="profile-work">
                    <p className="font-weight-bold">Age</p>
                        <span>{userProfile.age}</span><br/><br/>
                    <p className="font-weight-bold">SKILLS</p>
                        <span>{userProfile.skill1}</span><br/>
                        <span>{userProfile.skill2}</span><br/>
                        <span>{userProfile.skill3}</span><br/>
                        <span>{userProfile.skill4}</span><br/>
                        <span>{userProfile.skill5}</span><br/><br/>
                </div>
            </div>
            <div className="col-md-9">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="education-tab" data-toggle="tab" href="#education" role="tab" aria-controls="education" aria-selected="true">Education</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="work-tab" data-toggle="tab" href="#work" role="tab" aria-controls="work" aria-selected="false">Work</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="social-tab" data-toggle="tab" href="#social" role="tab" aria-controls="social" aria-selected="false">Social</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="badges-tab" data-toggle="tab" href="#badges" role="tab" aria-controls="badges" aria-selected="false">Badges</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                        </li>
                    </ul>
                
                <div className="tab-content education-tab" id="myTabContent">
                    <div className="tab-pane fade show active" id="education" role="tabpanel" aria-labelledby="education-tab">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Degree Name</th>
                                    <th scope="col">University</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{userProfile.degree1}</td>
                                        <td>{userProfile.school1}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>{userProfile.degree2}</td>
                                        <td>{userProfile.school2}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>{userProfile.degree3}</td>
                                        <td>{userProfile.school3}</td>
                                    </tr>
                                </tbody>
                            </table>                                
                    </div>
                    <div className="tab-pane fade " id="work" role="tabpanel" aria-labelledby="work-tab">
                    <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Post</th>
                                    <th scope="col">Years</th>
                                </tr>
                            </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{userProfile.company1}</td>
                                        <td>{userProfile.post1}</td>
                                        <td>{userProfile.years1}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>{userProfile.company2}</td>
                                        <td>{userProfile.post2}</td>
                                        <td>{userProfile.years2}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>{userProfile.company3}</td>
                                        <td>{userProfile.post3}</td>
                                        <td>{userProfile.years3}</td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                    <div className="tab-pane fade " id="social" role="tabpanel" aria-labelledby="social-tab">
                    <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Website</th>
                                    <th scope="col">Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Github</td>
                                        <td><a>{userProfile.github}</a></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>LinkedIn</td>
                                        <td><a>{userProfile.linkedin}</a></td>
                                    </tr>
                                </tbody>
                    </table>
                    </div>
                    <div className="tab-pane fade " id="badges" role="tabpanel" aria-labelledby="badges-tab">
                    <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Badge</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{userProfile.badge1}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>{userProfile.badge2}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>{userProfile.badge3}</td>
                                    </tr>
                                </tbody>
                    </table>
                    </div>
                    <div className="tab-pane fade " id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Info
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Email</td>
                                        <td>{userProfile.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Phone</td>
                                        <td>{userProfile.phone}</td>
                                    </tr>
                                </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal " id="edit-modal">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Edit Profile</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body">
                <div>
                <div class="form-group">
                        <h6>Skills</h6>
                        <div className="row">    
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="skill1" placeholder="Skill 1" value={userProfile.skill1}></input>
                            </div>
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="skill2"  placeholder="Skill 2" value={userProfile.skill2}></input>                  
                            </div>
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="skill3"  placeholder="Skill 3" value={userProfile.skill3}></input>                  
                            </div>
                        </div>
                        <div className="row">    
                        <div className="col-md-2"></div>        
                        <div className="col-md-4">
                                <input type="text" class="form-control" id="skill4" placeholder="Skill 4" value={userProfile.skill4}></input>
                            </div>
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="skill5"  placeholder="Skill 5" value={userProfile.skill5}></input>                  
                            </div>
                        <div className="col-md-2"></div>
                        </div>
                        </div>
                    <div class="form-group">
                        <h6>Education</h6>
                        <div className="row">    
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="degree1" placeholder="Enter 1st Degree" value={userProfile.degree1}></input>
                            </div>
                            <div className="col-md-4">
                            <input type="text" class="form-control" id="school1"  placeholder="Enter 1st School" value={userProfile.school1}></input>                  
                            </div>
                        </div>
                        <div className="row">    
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="degree2" placeholder="Enter 2nd Degree" value={userProfile.degree2}></input>
                            </div>
                            <div className="col-md-4">
                            <input type="text" class="form-control" id="school2"  placeholder="Enter 2nd School" value={userProfile.school2}></input>                  
                            </div>
                        </div>
                        <div className="row">    
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="degree3" placeholder="Enter 3rd Degree" value={userProfile.degree3}></input>
                            </div>
                            <div className="col-md-4">
                            <input type="text" class="form-control" id="school3"  placeholder="Enter 3rd School" value={userProfile.school3}></input>                  
                            </div>
                        </div>                        
                    </div>

                    <div class="form-group">
                        <h6>Work Experience</h6>
                        <div className="row">    
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="cname1" placeholder="Enter 1st Company" value={userProfile.company1}></input>
                            </div>
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="post1"  placeholder="Enter your Post" value={userProfile.post1}></input>                  
                            </div>
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="years1"  placeholder="Enter Years of Experience " value={userProfile.years1}></input>                  
                            </div>
                        </div>
                        <div className="row">    
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="cname2" placeholder="Enter 2nd Company" value={userProfile.company2}></input>
                            </div>
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="post2"  placeholder="Enter your Post" value={userProfile.post2}></input>                  
                            </div>
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="years2"  placeholder="Enter Years of Experience " value={userProfile.years2}></input>                  
                            </div>
                        </div>
                        <div className="row">    
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="cname3" placeholder="Enter 3rd Company" value={userProfile.company3}></input>
                            </div>
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="post3"  placeholder="Enter your Post" value={userProfile.post3}></input>                  
                            </div>
                            <div className="col-md-4">
                                <input type="text" class="form-control" id="years3"  placeholder="Enter Years of Experience" value={userProfile.years3}></input>                  
                            </div>
                        </div>                        
                    </div>
                    <div class="form-group">
                        <h6>Social</h6>
                        <div className="row">    
                            <div className="col-md-6">
                                <input type="text" class="form-control" id="github" placeholder="Enter your Github Link" value={userProfile.github}></input>
                            </div>
                            <div className="col-md-6">
                                <input type="text" class="form-control" id="linkedin"  placeholder="Enter your Linked Link" value={userProfile.linkedin}></input>                  
                            </div>
                        </div>
                        </div>
                        <div class="form-group">
                        <h6>Contact Details</h6>
                        <div className="row">    
                            <div className="col-md-6">
                                <input type="text" class="form-control" id="phone" placeholder="Enter your Phone Number" value={userProfile.phone}></input>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <input type="submit" className="btn btn-primary" value="Submit" onClick={handleeditprofile} ></input>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    </div> 
);
}
 
export default ProfilePage;