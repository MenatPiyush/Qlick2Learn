const express = require('express');
const Profile = require('../model/profile.model');
const router = express.Router();

router.get('/myprofile/:id',(req,res)=>{
    
    if (!req.body) {
        res.status(400).send({
            success : false,
            message: "Content can not be empty!"
        });
    }

    const user = new Profile({
        id: req.params.id
    });

    Profile.displayProfile(req.params.id,(err,data)=>{
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while displaying the User Profile."
          });

        if(data == null){
            return res.status(500).send({
                success: false,
                message:"User Not Found"
              });
        }else{
            return res.status(200).send({
                success: true,
                message:"Profile Obtained",
                data: data
              });
        }
    });
});

router.post('/editprofile',(req,res)=>{
    if (!req.body) {
        res.status(400).send({
            success : false,
            message: "Content can not be empty!"
        });
    }

    const user = new Profile({
    
        userId: req.body.userId,
        degree1:req.body.degree1,
        degree2:req.body.degree2,
        degree3:req.body.degree3,
        school1:req.body.school1,
        school2:req.body.school2,
        school3:req.body.school3,
        company1:req.body.company1,
        company2:req.body.company2,
        company3:req.body.company3,
        post1:req.body.post1,
        post2:req.body.post2,
        post3:req.body.post3,
        years1:req.body.years1,
        years2:req.body.years2,
        years3:req.body.years3,
        github:req.body.github,
        linkedin:req.body.linkedin,
        contact:req.body.contact,
        skill1:req.body.skill1,
        skill2:req.body.skill2,
        skill3:req.body.skill3,
        skill4:req.body.skill4,
        skill5:req.body.skill5,
        age:req.body.age,
        totalexperience:req.body.totalexperience,
    });

    Profile.editProfile(user,(err,data)=>{
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while displaying the User Profile."
          });

        if(data == null){
            return res.status(500).send({
                success: false,
                message:"User Not Found"
              });
        }else{
            return res.status(200).send({
                success: true,
                message:"Profile Updated",
                data: data
            });
        }
    });
});

module.exports = router;