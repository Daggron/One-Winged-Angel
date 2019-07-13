const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const index = require('./routes/index');

mongoose.connect("mongodb://127.0.0.1:27017/magnet",{useNewUrlParser:true});

const db = mongoose.connection;

db.on("error",()=>{
        console.log("Db can't be connected their might be some error"); 
});

db.once("open",()=>{
    console.log("Database connected successfully");
})

// Making a use of express static routing to load css and js files to the server and serve to browser
app.use(express.static("/public"));

// using the bodyparser to use the data send to srever from the body 
app.use(bodyparser.urlencoded({extended:false}));

//Setting the template engine to ejs
app.set("template engine","ejs");


app.get('/',index);

const port = process.env.Port || 3000

app.listen(port,()=>{
    console.log(`Server Started on the port ${port}`);
});