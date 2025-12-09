require('dotenv').config();
const jwt_decode = require('jsonwebtoken');
const express = require('express')
const http =require('http')
const bodyParser =require('body-parser')
const app =express();
app.use(bodyParser.json());
const server =http.createServer(app);
//const initMondayClient = require('monday-sdk-js');
const router =  require('./router')
//const {changeColumnValue, getColumnValue} = require('./services')

app.use(router);
/*
  app.post('/action2',(req,res)=>{
    res.status(200).send({})
    const token =  req.headers.authorization;
    const decoded = jwt_decode.decode(token);
   
   // console.log("INPUT FIEL", req.body.payload)
   // console.log("SHORTLIVEDTOKEN", decoded.shortLivedToken)
    let value = "Data Magician 2"  // {texte:"Okkay"}


   // getColumnValue(decoded.shortLivedToken,req.body.payload.inputFields.itemId,req.body.payload.inputFields.columnIdS)

    changeColumnValue(decoded.shortLivedToken,req.body.payload.inputFields.boardId,req.body.payload.inputFields.itemId,req.body.payload.inputFields.columnIdT,value)
   
   
      fetch("https://api.monday.com/v2",{  // a commenter ceci
          method:'post',
          headers:{ 
            'Authorization' : decoded.shortLivedToken,
            'Content-Type' : 'application/json'
        },
         body:JSON.stringify({
    'query':`mutation {change_simple_column_value(board_id:${req.body.payload.inputFields.boardId},item_id:${req.body.payload.inputFields.itemId},column_id:"texte",value:"Data Magician!"){id}}`,
    })

    })   // a commenter ceci
   

   
    
})

*/


server.listen(process.env.PORT|| 8282,function(){
    console.log("express server running on 8282")
})

