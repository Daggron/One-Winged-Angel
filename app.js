const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const index = require('./routes/index');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookieparser');
const expressValidator = require('express-validator');
const user = require('./models/user');

mongoose.connect("mongodb+srv://test:test@cluster0-r8vw1.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});

const db = mongoose.connection;

db.on("error",()=>{
        console.log("Db can't be connected their might be some error"); 
});

db.once("open",()=>{
    console.log("Database connected successfully");
});

// Making a use of express static routing to load css and js files to the server and serve to browser
app.use(express.static(__dirname+'/public'));

// using the bodyparser to use the data send to srever from the body 
app.use(bodyparser.urlencoded({extended:false}));

//Setting the template engine to ejs
app.set("view engine","ejs");

app.use(session({
    secret:'I am Ironman keyboard cat ',
    resave:true,
    saveUninitialized:true,

}));

app.use(require('connect-flash')());

app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


app.get('*',(req,res,next)=>{
    res.locals.user = req.user || null;
    console.log(res.locals.user);
    next();
});


app.use('/',index);


const port = process.env.Port || 3300;

// Listening the application port on 3000 for development server

app.listen(port,()=>{
    console.log(`Server Started on the port ${port}`);
});