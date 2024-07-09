const mongoose = require('mongoose')

const connectdb= async ()=>{
    try{
    await mongoose.connect('mongodb://localhost:27017/bcrypt')
    console.log('mongo db connection successful')
    }
    catch {(console.log('mongo db connection failed'))}
}

module.exports={connectdb,};