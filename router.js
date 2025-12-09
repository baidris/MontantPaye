const router = require('express').Router();

const jwt_decode = require('jsonwebtoken');
const express = require('express')
const http =require('http')
const bodyParser =require('body-parser')

const { authenticationMiddleware } = require('./authentification');
const mondayController = require('./conroller');

//router.post('/monday/execute_action', authenticationMiddleware, mondayController.executeActio
// n);
//router.post('/monday/get_remote_list_options', authenticationMiddleware, mondayController.getRemoteListOptions);

//const {changeColumnValue, getColumnValue} = require('./services')


  router.post('/cumul',authenticationMiddleware,mondayController.executeAction)
  router.post('/cumul2',authenticationMiddleware,mondayController.executeAction2)
  router.post('/action_cols',authenticationMiddleware,mondayController.executeAction21)
  //router.post('/goahead',authenticationMiddleware,mondayController.executeAction2)
 // router.post('/goahead2',authenticationMiddleware,mondayController.executeAction3)
  //router.post('/action_cols',authenticationMiddleware,mondayController.executeAction31)
  

router.get('/',(req, res)=>{
     console.log("req.body")
       res.end()
    })

 // test
  //  router.post('/goahead',(req, res)=>{
   //  console.log("BODY (go ahead) : ",  req.body)
   //  console.log( " HEADRES  (go ahead) : " ,req.headers)
    
    // res.status(200).send({})
    //const token =  req.headers.authorization;
    //const decoded = jwt_decode.decode(token);
    //let value = "Patientez..."
  //  changeColumnValue(decoded.shortLivedToken,req.body.payload.inputFields.boardId,req.body.payload.inputFields.itemId,req.body.payload.inputFields.columnIdT,value) 
  // console.log("no")
//})



module.exports = router;
