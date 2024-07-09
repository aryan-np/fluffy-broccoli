const { mongoose } = require('mongoose')
const User=require('../Model/user');
const bcrypt = require('bcrypt');

function hashPassword(password) {
    return new Promise((resolve , reject)=>{
    bcrypt.hash(password,10,(err,hash)=>{
        if (err){
            reject("Error while Hashing Password");
        }
        else{
            reject(hash)
        }
    })
})
}

async function authentificate(email,password){
    try {
        const userData = await User.findOne({ Email: email });
        if (!userData) return false;
        
        const match = await bcrypt.compare(password, userData.Password);
        return match;
    } catch (error) {
        console.error("Error during authentication:", error);
        return false;
    }

}

async function getAllUser(req,res){
        const allUsers =await User.find({}) 
        res.json(allUsers)
}
// async function registerUser(req,res){
//     const{name,email,password}=req.body;
//     const hashed_password= hashPassword(password)
//     await User.create({
//         Name: name,
//         Email:email,
//         Password:hashed_password
//     })

// }

async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        
        await User.create({
            Name: name,
            Email: email,
            Password: hashedPassword
        });

        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function login(req,res){
    const{email,password}=req.body;
    if (await authentificate(email,password)){
        res.json({"login":"Successful"})
    }
    else{
        res.json({"login":"invalid"})
    }


}

module.exports={
    getAllUser,
    registerUser,
    login,
}
