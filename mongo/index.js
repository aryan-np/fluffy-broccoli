const mongoose = require('mongoose');
const express=require('express');

const app=express();
app.use(express.urlencoded({extended:false}))
// app.use(express.json());

mongoose.connect('mongodb+srv://aryan:HBEowRkoUIZEWinF@aryan.kivoyia.mongodb.net/myDb')
.then(()=>console.log("mongo db connected"))
.catch((err)=>console.log("error"))


const userSchema=new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    job_title:{
        type:String,
        required: true,
    },
    
},
{timestamps:true})
const User=mongoose.model("user",userSchema)

app.route("/api/user/:id")
.get(async (req,res)=>{
    const requiredUser = await User.findById((req.params.id))
    console.log(requiredUser);
    if (requiredUser) {
        res.json(requiredUser)
    }
    else{
        res.status(404).send("User not found")

    }
})


app.get("/api/users",async(req,res)=>{
    const allUsers=await User.find({})
    res.status(400).json(allUsers)

})

app.post("/api/user",async (req,res)=>{
    const body=req.body
    console.log(body);
    if (
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.job_title 
    ) {
        return res.status(400).send("any fields cannot be empty")
    }

    await user.create({
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        job_title:body.job_title,
    })
    return res.status(401).json({"msg":"data inserted"})
   
})

app.listen(8000,()=>{
    console.log("Server Started")
})

