const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/',(req,res)=>{
    res.render("Index.ejs",{title:"The Magnet"})
});

router.get('/user/createuser',(req,res)=>{
   res.render('create.ejs');
});
router.post('/user/createuser',(req,res)=>{
    let query = {email:req.body.email};
    User.findOne(query,(err,found)=>{
        if(err) throw err;
        else{
            if(found){
                res.redirect('/user/createuser');
            }
            else {
                let user = new User();
                user.name = req.body.fname;
                user.email = req.body.email;
                user.Address.Apartment=req.body.apartment;
                user.Address.City=req.body.city;
                user.Address.Landmark = req.body.street;
                user.Address.Pincode = req.body.zip;
                user.status = "Active";
                user.role = "End-user";
                user.password = req.body.password;
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(user.password , salt ,(err, hash)=>{
                        user.password = hash;
                        User.create(user,(err)=>{
                            if(err) throw  err;
                            res.send("User Added Successfully");
                        });
                    });
                });
            }
        }
    });

});
module.exports=router;