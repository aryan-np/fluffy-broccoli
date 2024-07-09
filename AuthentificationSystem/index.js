const express = require('express')
const router = require("./Routes/login")

const {connectdb}= require('./connection')


app=express();

app.use(express.urlencoded({ extended: false }))

app.use('/api',router)

connectdb();

app.listen(5000,()=>{
    console.log("app hosted on port 5000");
})

