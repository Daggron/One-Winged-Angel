const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("Index.ejs",{title:"The Magnet"})
});


module.exports=router;