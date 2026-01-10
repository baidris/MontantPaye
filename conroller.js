 const mondayService = require('./services');
//const transformer = require('./transformer')
//const wn = require('./c_to_l')  // wn word to number

async function executeAction(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const {boardId,itemId, columnId, columnCRT1,columnCRT2,columnCRT3, columnDEPOT } = inputFields;
    console.log("Input fIelds : ",inputFields)
    const criters = await mondayService.get_cin_tp(shortLivedToken, itemId, columnCRT1 , columnCRT2, columnCRT3);
    let crt1_col = criters[0].id
    let crt1_val = criters[0].text
    let crt2_col = criters[1].id
    let crt2_val = criters[1].text
    console.log("crt1_col: ",crt1_col," crt1_val: ", crt1_val," crt2_col: " ,crt2_col,"crt2_val: " ,crt2_val)
    const rslt = await mondayService.getCumul2(shortLivedToken,boardId,columnId,crt1_col,crt1_val,crt2_col,crt2_val)
    console.log(rslt)
    rslt.tab_ids.map(j=> {
        if(j == itemId){
                    mondayService.depot_cumul_SNF2(shortLivedToken,boardId,j,columnDEPOT,(rslt.tot).toString()) 
            //console.log("yes")
                }else{
                 mondayService.depot_cumul_SNF2(shortLivedToken,boardId,j,columnDEPOT,(0).toString())
               // console.log("no")
           }
                        })

    //STEP 2
    const table2D = await mondayService.get_all_tp_cin(shortLivedToken,columnId,boardId,crt2_col, crt2_val,crt1_col)//Table2D
    //console.log("table 2D from controleur", table2D)
    const cmlTypObject = await mondayService.getCml_typeP(table2D)
    //console.log("from controleur",cmlTypObject)
    let ESPECE= null;let VERSEMENT= null ;let VIREMENT= null
    for(const k in cmlTypObject){ 
      if(k==="ESPECE"){ESPECE=cmlTypObject[k] }
      if(k==="VIREMENT"){ VIREMENT =cmlTypObject[k]}
      if(k==="VERSEMENT"){ VERSEMENT=cmlTypObject[k]}
    }
    console.log("ESPECE : ",ESPECE)
    console.log("VERSEMENT : ",VERSEMENT)
    console.log("VIREMENT : ",VIREMENT)

    const plsTypeObject = await mondayService.getPulse_typeP(table2D)
    console.log(plsTypeObject)


    for(const k in plsTypeObject){ 
      if(k==="ESPECE" && crt1_val!="ESPECE"){ 
        plsTypeObject[k].forEach((item, index) => {
           if(index==0){
              mondayService.depot_cumul_SNF2(shortLivedToken,boardId,item,columnDEPOT,ESPECE.toString()) 
           }
           if(index!=0){
              mondayService.depot_cumul_SNF2(shortLivedToken,boardId,item,columnDEPOT,"0") 
           }
               });
            } 
             if(k==="VERSEMENT" && crt1_val!="VERSEMENT"){ 
        plsTypeObject[k].forEach((item, index) => {
           if(index==0){
              mondayService.depot_cumul_SNF2(shortLivedToken,boardId,item,columnDEPOT,VERSEMENT.toString()) 
           }
           if(index!=0){
              mondayService.depot_cumul_SNF2(shortLivedToken,boardId,item,columnDEPOT,"0") 
           }
               });
            } 
              if(k==="VIREMENT" && crt1_val!="VIREMENT"){ 
        plsTypeObject[k].forEach((item, index) => {
           if(index==0){
              mondayService.depot_cumul_SNF2(shortLivedToken,boardId,item,columnDEPOT,VIREMENT.toString()) 
           }
           if(index!=0){
              mondayService.depot_cumul_SNF2(shortLivedToken,boardId,item,columnDEPOT,"0") 
           }
               });
            } 
    }
    
    // 
    
    //const rslt = await mondayService.getCumul2(shortLivedToken,boardId,columnId,crt1_col,crt1_val,crt2_col,crt2_val) 
    //console.log(rslt)  // token, brdId, itemId, columnDEPOT, value
   // ancienne await mondayService.depot_cumul_SNF2(shortLivedToken,boardId,itemId,columnDEPOT,(rslt.tot).toString()) // rslt.tot.toString()
    /*
   rslt.tab_ids.map(j=> {
        if(j == itemId){
                    mondayService.depot_cumul_SNF2(shortLivedToken,boardId,j,columnDEPOT,(rslt.tot).toString()) 
            //console.log("yes")
                }else{
                 mondayService.depot_cumul_SNF2(shortLivedToken,boardId,j,columnDEPOT,(0).toString())
               // console.log("no")
           }
                        }) */

    /*
    const cumul = await mondayService.getCumul(shortLivedToken, itemId, columnId, columnCRT1,columnCRT2,columnCRT3  );
    const criters = await mondayService.get_cin_tp(shortLivedToken, itemId,columnCRT1,columnCRT2,columnCRT3  );     
    console.log("CUMUL => ", cumul )
    
    if (infos[0]!= ""){
    const existe = await mondayService.existeOuPas(shortLivedToken,infos[0],infos[1],infos[2])
    console.log( "ça existe ? ", existe)
    await mondayService.changeColumnValue(shortLivedToken, boardId, itemId, columnTarget, existe);
    
   }*/
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}
/*
async function executeAction2(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const {boardId,itemId, columnId, columnRechId ,columnBrd ,columnTarget, columnIndq,duel } = inputFields;
    console.log(inputFields)
    const infos = await mondayService.getColumnValue(shortLivedToken, itemId, columnIndq, columnRechId, columnBrd,  );
         
    console.log("SEEK A VALUE => ",infos[0],"  ", infos[1], " ", infos[2] )
    
    if (infos[0]!= ""){
    const existe = await mondayService.existeOuPas2(shortLivedToken,infos[0],infos[1],infos[2],duel)
    console.log( "ça existe ? ", existe)
    await mondayService.changeColumnValue(shortLivedToken, boardId, itemId, columnTarget, existe);
   }
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}
*/

async function executeAction2(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const {boardId,boardCTX,itemId, columnId, colID,colID1,colID2,colIDcml ,columnDEPOT } = inputFields;
    console.log("INPUTFIELDS =>",inputFields)
    const criters = await mondayService.get_cin_tp(shortLivedToken, itemId, colID.value ,colID1.value ,colID2.value ); //on recupere les criteres
    let crt1_col = criters[0].id
    let crt1_val = criters[0].text
    let crt2_col = criters[1].id
    let crt2_val = criters[1].text
    let crt_col = criters[2].id
    let crt_val = criters[2].text

    console.log(crt1_col, crt1_val, crt2_col, crt2_val)
    console.log("crt 3 ",  criters[2].id)
    // Extraire le cumul du tableau externe selon des criteres (cin, type paiement, paiement)
    const rslt = await mondayService.getCumul21(shortLivedToken,boardId,crt_col,crt_val,crt1_col,crt1_val,crt2_col,crt2_val,colIDcml.value) 
    // Extraire les ids du tableau interne selon des criteres (cin, type paiement, paiement)
    console.log("Resultat cumul SNF : ",rslt)  // token, brdId, itemId, columnDEPOT, value
    const rsltIds = await mondayService.getCumul211(shortLivedToken,boardCTX,crt_col,crt_val,crt1_col,crt1_val,crt2_col,crt2_val)
    //console.log("Resultat cumul SNF : ",rslt)  // token, brdId, itemId, columnDEPOT, value
    console.log("Resultat TAB IDS INTERNE : ",rsltIds) 
   // await mondayService.depot_cumul_SNF2(shortLivedToken,boardId,itemId,columnDEPOT,(rslt.tot).toString()) // rslt.tot.toString()
    rsltIds.map(j=> {
        if(j == itemId){
                    mondayService.depot_cumul_SNF2(shortLivedToken,boardCTX,j,columnDEPOT,rslt.toString()) 
            //console.log("yes")
                }else{
                 mondayService.depot_cumul_SNF2(shortLivedToken,boardCTX,j,columnDEPOT,(0).toString())
               // console.log("no")
           }
  })
    /*
    const cumul = await mondayService.getCumul(shortLivedToken, itemId, columnId, columnCRT1,columnCRT2,columnCRT3  );
    const criters = await mondayService.get_cin_tp(shortLivedToken, itemId,columnCRT1,columnCRT2,columnCRT3  );     
    console.log("CUMUL => ", cumul )
    
    if (infos[0]!= ""){
    const existe = await mondayService.existeOuPas(shortLivedToken,infos[0],infos[1],infos[2])
    console.log( "ça existe ? ", existe)
    await mondayService.changeColumnValue(shortLivedToken, boardId, itemId, columnTarget, existe);
    
   }*/
    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

async function executeAction21(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;
  console.log( "lived TOKEN  : " , shortLivedToken)
  console.log( "Session  : " , req.session)
  console.log( "LE PAYLOAD col : " , payload)
  const {dependencyData} = payload 
  console.log("BOARD IDEP => ",dependencyData.boardId)
  const {boardId} = dependencyData
  //const {boardId} = dependencyData
  console.log("la valeur dep :", boardId)//dependencyData.boardId
  try {
    //const { inputFields } = payload;
    //const {boardId,itemId, columnId, columnRechId ,columnBrd ,columnTarget, columnIndq } = inputFields;
    let columns = []
    columns = await mondayService.getAllColumns(shortLivedToken, boardId );
   // console.log("SEEK All COLUMNS monday.com => ", columns)
        
    // return res.status(200).send(   [ { title:'100' , value:'cent' }, { title:'200' , value:'deux cent' },{ title:'300' , value:'trois cent' }  ]    );
    return res.status(200).send( columns );
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

module.exports = {
  executeAction,
  executeAction2,
  executeAction21
};
