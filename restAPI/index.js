const express=require('express');
const users=require('./MOCK_DATA.json');
const fs= require('fs');

const app=express();

app.use(express.urlencoded({extended:false}))

app.get('/api/users',(req,res)=>{
    res.json(users)
})

app.route("/api/user/:id")
.get((req,res)=>{
    const id = Number(req.params.id)
    let requiredUser=users.find(user=>user.id===id)
    // let requiredUser=users.filter(user=>user.id===id)   // can be filtered
    console.log(typeof(requiredUser));
    if (requiredUser) {
        res.json(requiredUser)
    }
    else{
        res.status(404).send("User not found")

    }
})
.patch((req,res)=>{
    // edit user with given id
    const body=req.body
    const id = Number(req.params.id)
    let index=users.findIndex(user=>user.id===id)
    console.log(users[index]);
    if (index>-1) {
        users[index]={"id":id,
                     ...body}
        console.log(users[index]);
        fs.writeFile("./MOCK_DATA.json",`${JSON.stringify(users)}`,err=>{console.log(err)})
         res.send("Sucessful edit")  
    }
    else{
        res.status(404).send("User not found")

    }

})
.delete((req,res)=>{
    // delete user with given id
    const id=Number(req.params.id);
    const index=users.findIndex(user=>user.id===id)
    if (index>-1) {
        users.splice(index,1)
        fs.writeFile("./MOCK_DATA.json",`${JSON.stringify(users)}`,err=>{console.log(err)})
        return res.send('record deleted')
    }
    else{
        res.status(404).send("user Not found")
    }
})

app.post("/api/user",(req,res)=>{
    const body=req.body
    console.log(body);
    let newId=Number(users[users.length-1].id) + 1
    let count=1;
    while(users[newId]){
        newId++;
    }
    users.push({id:newId ,...body})
    fs.writeFile("./MOCK_DATA.json",`${JSON.stringify(users)}`,err=>{console.log(err)})
    console.log(users[users.length-1]);
   return res.send("post method")
})

app.listen(8000,()=>{
    console.log("Server Started")
})