const express = require('express');
const router = express.Router();

const { getAllUser,registerUser,login }=require('../Controllers/user')
const {User} = require('../Model/user')

router.get("/",getAllUser)

router.post("/register",registerUser)

router.post('/login',login)

module.exports=router;