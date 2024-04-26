const mondayService = require('./services');
const transformer = require('./transformer')
const wn = require('./c_to_l')  // wn word to number

async function executeAction(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { boardId, itemId, columnIdS, columnIdT } = inputFields;

    const ttc = await mondayService.getColumnValue(shortLivedToken, itemId, columnIdS);
    var lang = 'fr'

var ttcL= ""

if (ttc.includes(".")) {

let montant1 = ttc.split('.')[0]
let montant2 = ttc.split('.')[1]

ttcL =   capitalizeFirstLetter( wn(montant1,{lang:lang}).toLowerCase() +" dirhams et " + wn(montant2,{lang:lang}).toLowerCase() +" centimes")

}
else{
ttcL =  capitalizeFirstLetter( wn(ttc,{lang:lang}).toLowerCase() +" dirhams" )
}


// cette fonction permet de rendre la premiere lettre Majuscule d'un texte entier.
function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

    
    /*
    let num =  text
    const chaine_text =  transformer(text).toUpperCase()
    const chaine_dev = chaine_text +"DIRHAMS"
    */
    
    
    await mondayService.changeColumnValue(shortLivedToken, boardId, itemId, columnIdT, ttcL);

    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

module.exports = {
  executeAction

};
