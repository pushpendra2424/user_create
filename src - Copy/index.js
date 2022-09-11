const dotenv = require('dotenv');
const express = require('express');
const route = require('./routes/routes')
const app = express()
dotenv.config({path:'./config.env'});
const mongoose = require('mongoose')
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/userDataCreate",
{useNewUrlParser:true})
.then( ()=>console.log("mongodb connect"))
.catch(err=>console.log(err))
app.use('/',route)
app.listen(500,function(){
    console.log("express is running")
})

// 7678497921

