const initMondayClient = require('monday-sdk-js');

const get_all_tp_cin = async (token,column_id,brdId,crt1_col,crt1_val,crt2_col) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

      console.log(token)
      console.log("PARAMS => ",column_id,brdId,crt1_col,crt1_val,crt2_col)
    const query =
     `query ($column_id:String!,$crt1_val: String, $brdId: ID!, $crt1_col: String!,$crt2_col: String!){ items_page_by_column_values(
    board_id: $brdId
    columns:
    [{column_id: $crt1_col, column_values: [$crt1_val]}]
  ) {
    items {
      id, column_values(ids:[$column_id, $crt1_col,$crt2_col]){id text}
    }
  }
}`;
    const variables = { column_id,brdId,crt1_col,crt1_val,crt2_col};

    const response = await mondayClient.api(query, { variables });
    let infos =[]
    let resultat  = response.data.items_page_by_column_values.items 
   // console.log("Resultat Final: ",resultat)
    
    const columns = ["id", ...resultat[0].column_values.map(c => c.id)];

const table2D = [
  columns,
  ...resultat.map(item => [
    item.id,
    ...item.column_values.map(c => c.text)
  ])
];
console.log("table 2D : ", table2D)

//console.log(" cml typ piem   ", getCml_typeP(table2D))
//console.log(" grp as object   ", getPulse_typeP(table2D))


/*
// unique tp
const uniqueTypePaiement = [
  ...new Set(
    
      resultat.map(item =>
        item.column_values.find(col => col.id === "typepaiement")?.text
      )
      .filter(Boolean)
  )
];

console.log(" tp unique : ", uniqueTypePaiement);
uniqueTypePaiement.forEach(itm=>getCmlType(table2D,itm))
*/
   // infos.push(resultat.find(itm => itm.id == columnId).text)
   // infos.push(resultat.find(itm => itm.id == columnBrd).text)
   // infos.push(resultat.find(itm => itm.id == columnRechId).text)
    // console.log("its okay !!" , response.data.items[0].column_values[0].text)
    //  console.log("Tableau contient = ",infos[0]," ", infos[1], " ", infos[2],'=', columnRechId,"=", columnId)
    return table2D // resultat //infos //resultat[0].text  //infos[0]   //response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};

const get_unq_tp = async (token, itemId,columnCRT1, columnCRT2, columnCRT3 ) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

      console.log(token)
      console.log("PARAMS => ",itemId,  columnCRT1, columnCRT2, columnCRT3)
    const query = `query( $itemId: [ID!],$columnCRT1:String!,$columnCRT2:String!,$columnCRT3:String!){ items (ids: $itemId) { column_values(ids:[$columnCRT1,$columnCRT2,$columnCRT3 ]) { id, text}}}`;
    const variables = { itemId, columnCRT1, columnCRT2, columnCRT3};

    const response = await mondayClient.api(query, { variables });
    let infos =[]
    let resultat  = response.data.items[0].column_values 
    console.log(resultat)
   // infos.push(resultat.find(itm => itm.id == columnId).text)
   // infos.push(resultat.find(itm => itm.id == columnBrd).text)
   // infos.push(resultat.find(itm => itm.id == columnRechId).text)
    // console.log("its okay !!" , response.data.items[0].column_values[0].text)
    //  console.log("Tableau contient = ",infos[0]," ", infos[1], " ", infos[2],'=', columnRechId,"=", columnId)
    return resultat //infos //resultat[0].text  //infos[0]   //response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};


const get_cin_tp = async (token, itemId,columnCRT1, columnCRT2, columnCRT3 ) => {// retourne tableau 2dim
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

      console.log(token)
      console.log("PARAMS => ",itemId,  columnCRT1, columnCRT2, columnCRT3)
    const query = `query( $itemId: [ID!],$columnCRT1:String!,$columnCRT2:String!,$columnCRT3:String!){ items (ids: $itemId) { column_values(ids:[$columnCRT1,$columnCRT2,$columnCRT3 ]) { id, text}}}`;
    const variables = { itemId, columnCRT1, columnCRT2, columnCRT3};

    const response = await mondayClient.api(query, { variables });
    let infos =[]
    let resultat  = response.data.items[0].column_values 
    console.log(resultat)
   // infos.push(resultat.find(itm => itm.id == columnId).text)
   // infos.push(resultat.find(itm => itm.id == columnBrd).text)
   // infos.push(resultat.find(itm => itm.id == columnRechId).text)
    // console.log("its okay !!" , response.data.items[0].column_values[0].text)
    //  console.log("Tableau contient = ",infos[0]," ", infos[1], " ", infos[2],'=', columnRechId,"=", columnId)
    return resultat //infos //resultat[0].text  //infos[0]   //response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};

const getCmlType = async(table2D,typaie)=>{//renvoie type paiement unK avec l ens des id lies au type:[{esp:[1,2,3]},...]
  let cml = 0;
   table2D.forEach(el => {
    if (el[1] === typaie) {
      cml += Number(el[2]);
    }
  });
 console.log( typaie, "-----" , cml )
  return cml;
}

//*
const getCml_typeP = async(table2D)=> {// renvoie SEUL OBJECT TYP + CML {esp:3, vir:12}
  return table2D.reduce((acc, [ , type, value ]) => {
    acc[type] = (acc[type] || 0) + Number(value || 0);
      return acc;
  }, {});
}

//*
const   getPulse_typeP = async(table2D) =>{//renvoie SEUL OBJECT type paiement unK avec l ens des id lies au type:{esp:[1,2,3],....}
  return table2D.reduce((acc, [id, type]) => {
    acc[type] = acc[type] || [];
    acc[type].push(id);
    
    return acc;
  }, {});
}


/*
const getCumul = async (token, itemId, columnId, columnRechId, columnBrd) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query( $itemId: [ID!], $columnId:String!, $columnRechId:String!, $columnBrd:String!){ items (ids: $itemId) { column_values(ids:[$columnId,$columnRechId,$columnBrd]) { id, text}}}`;
    const variables = { columnId, itemId ,columnRechId ,columnBrd};

    const response = await mondayClient.api(query, { variables });
    let infos =[]
    let resultat  = response.data.items[0].column_values 
    infos.push(resultat.find(itm => itm.id == columnId).text)
    infos.push(resultat.find(itm => itm.id == columnBrd).text)
    infos.push(resultat.find(itm => itm.id == columnRechId).text)
    // console.log("its okay !!" , response.data.items[0].column_values[0].text)
      console.log("Tableau contient = ",infos[0]," ", infos[1], " ", infos[2],'=', columnRechId,"=", columnId)
    return infos //resultat[0].text  //infos[0]   //response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};


const getColumnValue = async (token, itemId, columnId, columnRechId, columnBrd) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query( $itemId: [ID!], $columnId:String!, $columnRechId:String!, $columnBrd:String!){ items (ids: $itemId) { column_values(ids:[$columnId,$columnRechId,$columnBrd]) { id, text}}}`;
    const variables = { columnId, itemId ,columnRechId ,columnBrd};

    const response = await mondayClient.api(query, { variables });
    let infos =[]
    let resultat  = response.data.items[0].column_values 
    infos.push(resultat.find(itm => itm.id == columnId).text)
    infos.push(resultat.find(itm => itm.id == columnBrd).text)
    infos.push(resultat.find(itm => itm.id == columnRechId).text)
    // console.log("its okay !!" , response.data.items[0].column_values[0].text)
      console.log("Tableau contient = ",infos[0]," ", infos[1], " ", infos[2],'=', columnRechId,"=", columnId)
    return infos //resultat[0].text  //infos[0]   //response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};
*/
const getColumnValue3 = async (token, itemId, columnId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query( $itemId: [ID!], $columnId:String!){ items (ids: $itemId) { column_values(ids:[$columnId]) { id, text}}}`;
    const variables = { columnId, itemId};

    const response = await mondayClient.api(query, { variables });
    let infos =[]
    let resultat  = response.data.items[0].column_values 
    infos.push(resultat.find(itm => itm.id == columnId).text)
    //infos.push(resultat.find(itm => itm.id == columnBrd).text)
    //infos.push(resultat.find(itm => itm.id == columnRechId).text)
    // console.log("its okay !!" , response.data.items[0].column_values[0].text)
      console.log("Tableau contient = ",infos[0]) //," ", infos[1], " ", infos[2],'=', columnRechId,"=", columnId)
    return infos //resultat[0].text  //infos[0]   //response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};


const getCumul2 = async (token, brdId,column_id, crt1_col,crt1_val,crt2_col,crt2_val) => {
    //console.log("le board id :", brdId, " ", colId)
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);


    const query = `query ($column_id:String!,$crt1_val:String ,$crt2_val:String , $brdId:ID!, $crt1_col:String!,$crt2_col:String!)
    { items_page_by_column_values( board_id:$brdId, columns:[{column_id: $crt1_col, column_values:[$crt1_val]},{column_id:$crt2_col, column_values:[$crt2_val]}]) {items { id, column_values(ids:[$column_id]){text}} }}`;
        
    const variables = {column_id, crt1_val, brdId, crt1_col, crt2_col, crt2_val };

    const response = await mondayClient.api(query, { variables });
    console.log("its okay !!" , response.data.items_page_by_column_values.items.length)
    let tab_rslt = response.data.items_page_by_column_values.items
    let tot=0
    tab_rslt.map(i => tot+= Number(i.column_values[0].text) )
    console.log(tot)
    let tab_ids =[]
    tab_rslt.map(i => tab_ids.push(i.id))
    console.log(tab_ids)
    //let exist = response.data.items_page_by_column_values.items.length
    //if(exist==0){ return "Not Found"}else { return "Found" }

    return {tot, tab_ids} // response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};
     // cumul dans un tableau externe
const getCumul21 = async (token, brdId, crt_col, crt_val, crt1_col,crt1_val,crt2_col,crt2_val,column_id) => {
    //console.log("le board id :", brdId, " ", colId)
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);


    const query = `query ($column_id:String!,$crt_col:String!,$crt_val:String,$crt1_val:String ,$crt2_val:String , $brdId:ID!, $crt1_col:String!,$crt2_col:String!)
    { items_page_by_column_values( board_id:$brdId, columns:[{column_id: $crt_col, column_values:[$crt_val]},{column_id: $crt1_col, column_values:[$crt1_val]},{column_id:$crt2_col, column_values:[$crt2_val]}]) {items { id, column_values(ids:[$column_id]){text}} }}`;
        
    const variables = {column_id,  brdId,crt_col,crt_val ,crt1_col,crt1_val, crt2_col, crt2_val };

    const response = await mondayClient.api(query, { variables });
    console.log("its okay !!" , response.data.items_page_by_column_values.items.length)
    let tab_rslt = response.data.items_page_by_column_values.items
    let tot=0
    tab_rslt.map(i => tot+= Number(i.column_values[0].text) )
    console.log(tot)
    
    //let exist = response.data.items_page_by_column_values.items.length
    //if(exist==0){ return "Not Found"}else { return "Found" }

    return tot // response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};


  // bord id ctxt  board interne  contexte, on cherche les pulse ids
const getCumul211 = async (token, boardCTX,crt_col,crt_val, crt1_col,crt1_val,crt2_col,crt2_val) => {
    console.log("le board ctxt  ", boardCTX,crt_col,crt_val, crt1_col,crt1_val,crt2_col,crt2_val)
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);


    const query = `query ($crt1_val:String ,$crt2_val:String,$crt_val:String , $boardCTX:ID!, $crt1_col:String!,$crt2_col:String!,$crt_col:String!)
    { items_page_by_column_values( board_id:$boardCTX, columns:[{column_id: $crt_col, column_values:[$crt_val]},{column_id: $crt1_col, column_values:[$crt1_val]},{column_id:$crt2_col, column_values:[$crt2_val]}]) {items { id} }}`;
        
    const variables = {crt1_val, boardCTX, crt1_col, crt2_col, crt2_val,crt_col, crt_val };

    const response = await mondayClient.api(query, { variables });
    console.log("its okay !!" , response.data.items_page_by_column_values.items.length)
    let tab_rslt = response.data.items_page_by_column_values.items
    //let tot=0
    //tab_rslt.map(i => tot+= Number(i.column_values[0].text) )
    //console.log("tot cml : ",tot)
    let tab_ids =[]
    tab_rslt.map(i => tab_ids.push(i.id))
    console.log(tab_ids)
    //let exist = response.data.items_page_by_column_values.items.length
    //if(exist==0){ return "Not Found"}else { return "Found" }

    return tab_ids // response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};



const  depot_cumul_SNF2 = async (token, brdId, itemId, columnDEPOT, value) => {
         
    //const  query =`mutation change_column_value ($brdId:ID!,$itemId:ID!,$columnDEPOT:String!,$value:String!){change_simple_column_value(item_id: $itemId, board_id: $brdId, column_id:$columnDEPOT, value: $value) {id}}`
    
    try {
    const mondayClient = initMondayClient({ token });
    
     const  query =`mutation change_column_value ($brdId:ID!,$itemId:ID!,$columnDEPOT:String!,$value:String!){change_simple_column_value(item_id: $itemId, board_id: $brdId, column_id:$columnDEPOT, value: $value) {id}}`
    const variables = { brdId, itemId, columnDEPOT, value };
    const response = await mondayClient.api(query,{variables});
    //console.log(token)
    console.log("okk dataase", brdId, itemId, columnDEPOT, value)
    return response;
    } catch (err) {
    console.error(err);

  }
    
}


/*
const existeOuPas2 = async (token, val, brdId, colId,duel) => {
    console.log("le board id :", brdId, " ", colId, "le DUEL chaine taille :" , duel.length)
    let tab_duel = duel.split(",")
    let found = tab_duel[0].trim().toUpperCase()
    let not_Found = tab_duel[1].trim().toUpperCase()
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query ($val:String , $brdId:ID!, $colId:String!)
    { items_page_by_column_values( board_id:$brdId, columns:[{column_id: $colId, column_values:[$val]}]) {items { id} }}`;
        
    const variables = { val, brdId, colId };

    const response = await mondayClient.api(query, { variables });
    console.log("its okay !!" , response.data.items_page_by_column_values.items.length)
    console.log("tab_rslt")   
    let tab_rslt = response.data.items_page_by_column_values.items
    console.log(tab_rslt)
    // tab_rslt.map(i => console.log( i.column_values[0].text) )
    //if(exist==0){ return not_Found}else { return found }
    //return response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};


*/
const getAllColumns = async (token, boardId) => {
     console.log("BoardIDEP : ",boardId)
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);
    //mondayClient.setApiVersion('2024-01');

    const query = `query ($boardId:[ID!]) {boards (ids:$boardId) {columns {id title }}}` //`query {boards (ids:2087093653) {columns {id title }}}` //`query ($boardId:[ID!]) {boards (ids:$boardId) {columns {id title }}}";
    const variables =  {boardId}; 
    //console.log("LES VARIABLES ",{variables}) 
    const response = await mondayClient.api(query,{variables});
    
    console.log("le nombre de colonnes:" , response)
    console.log("TOKEN :" , token)
  //  console.log("le nombre de colonnes:" , variables)
   const orig = response.data.boards[0].columns
   const colObj = orig.map(itm => { return {title:itm.title, value: itm.id} })
    
  //  const tab = [{title:'value 1', value:'Value #1'}, {title:'value 2', value:'Value #2'},{title:'value 3', value:'Value #3'},{title:'value 4', value:'Value #4'},{title:'value 5', value:'Value #5'}]
       
    return colObj
       // return response.data.items[0].column_values[0].text;
  } catch (err) {
    console.error(err);
  }
};

/*
const changeColumnValue = async (token, boardId, itemId, columnId, value) => {
        console.log( "brdid: ", boardId, " itmid: ", itemId, " clmnid: " , columnId, " value : ", value )
  try {
    const mondayClient = initMondayClient({ token });
    //const query  = `mutation {change_simple_column_value(board_id:1382994588,item_id:1439824129,column_id:"texte",value:"Data Magician!"){id}}`
     //const query  = `mutation {change_simple_column_value(board_id:${boardId},item_id:${itemId},column_id:${columnId},value:${value}){id}}`
     const query = `mutation change_column_value($boardId: ID!, $itemId: ID!,$columnId: String! ,$value: String!){change_simple_column_value(item_id: $itemId  column_id:$columnId value: $value  board_id: $boardId) { id}}
      `;
     
     const variables = { boardId, columnId, itemId, value };
     const response = await mondayClient.api(query,{variables});
     console.log("okk")
    return response;
  } catch (err) {
    console.error(err);
  }
}; */

module.exports = {
  get_cin_tp,
  getCumul2,
  getCumul21,
  getCumul211,
  depot_cumul_SNF2,
 // existeOuPas2,
 //changeColumnValue,
 getAllColumns,
 get_all_tp_cin,
 getCml_typeP,
 getPulse_typeP
 //getColumnValue3
};
