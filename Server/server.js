const http=require('http');
const fs=require('fs');
const url=require('url')

const myServer=http.createServer((req,res)=>{
    
    
    const log=`${new Date()} + ${req.url} \n`
    const myUrl=url.parse(req.url,true)
    if (myUrl.pathname==='/favicon.ico') return res.end();
         console.log(myUrl);
         fs.appendFile("log.txt",log,(err)=>{
            if (!err) {
                switch (myUrl.pathname) {
                  
                        case "/":
                            res.end("This is home");
                        break;
                        case "/about":
                            res.end("This is about us");
                        break;
                        case "/contact":
                            res.end("This is contact");
                        break;
                        case "/favicon.ico":
                            break;
                       
                
                    default:
                        console.log("404 not found");
                        break;
                    } 
                }
        })
         
})
myServer.listen(8000,()=>{
    console.log("Server Side Sucessful");
})
















