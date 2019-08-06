const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const flash = require('connect-flash');

// router.use(session({
//     secret:'I am Ironman keyboard cat ',
//     resave:true,
//     saveUninitialized:true,
// }));
//
// router.get('*',(req,res,next)=>{
//     res.locals.user = req.session.user || null;
//     console.log(res.locals.user);
//     next();
// });
//
//


router.get('/',(req,res)=>{
    if(req.session.user) {

        res.render("Index.ejs", {title: "The Magnet",user:req.session.user});
    }
    else{
        res.redirect('/user/login');
    }
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
                req.flash("info","User already exists");
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

router.get('/user/login',(req,res)=>{
    res.render("login.ejs");
});
router.post('/user/login',(req,res)=>{
   let query = {email:req.body.email};
   User.findOne(query,(err,found)=>{
       if(!found){
           // req.flash("User not found");
           req.flash("Error","Please create a user");
           res.redirect('/user/createuser');
       }
       else if(found){
           let check = bcrypt.compare(req.body.password,found.password,(err, result)=>{
               if(err){
                   console.log(err);
               }
               else if(result === true){
                   req.session.user = found;
                   res.locals.user = found;
                   console.log(res.locals.user);
                   res.redirect('/');

               }
               else{
                   res.send("Wrong password");
                   res.redirect('/user/login');
                   return null;
               }
           });
       }
   })
});




module.exports=router;