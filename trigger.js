const express =require('express')
const http =require('http')
const bodyParser =require('body-parser')
const app =express();
app.use(bodyParser.json());
const server =http.createServer(app);

app.post('/subscribe',(req,res)=>{
    console.log(req.body.payload.webhookUrl)
    
    res.status(200).send({})
})

server.listen(process.env.PORT|| 3000,function(){
    console.log("express server running on 3000")
})

