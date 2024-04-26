const router = require('express').Router();

const jwt_decode = require('jsonwebtoken');
const express = require('express')
const http =require('http')
const bodyParser =require('body-parser')

const { authenticationMiddleware } = require('./authentification');
const mondayController = require('./conroller');

//router.post('/monday/execute_action', authenticationMiddleware, mondayController.executeAction);
//router.post('/monday/get_remote_list_options', authenticationMiddleware, mondayController.getRemoteListOptions);

//const {changeColumnValue, getColumnValue} = require('./services')


router.post('/action',authenticationMiddleware,mondayController.executeAction)

/*

router.post('/action',(req, res)=>{

    res.status(200).send({})
    const token =  req.headers.authorization;
    const decoded = jwt_decode.decode(token);
    let value = "Patientez..."
    changeColumnValue(decoded.shortLivedToken,req.body.payload.inputFields.boardId,req.body.payload.inputFields.itemId,req.body.payload.inputFields.columnIdT,value) 
  // console.log("no")
})
*/


module.exports = router;
