const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    token:{
        type:String
    },
    password:{
        type:String
    },
    status:{
        type:String
    },
    role:{
        type:String
    },
    Address:{
        Landmark:String,
        Apartment:String,
        City:String,
        Pincode:String,
    }
});

let User  = module.exports = mongoose.model('User',Schema);