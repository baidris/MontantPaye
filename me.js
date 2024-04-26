//const transform = require('./transformation_service')

//console.log(transform('abdelhak','TO_UPPER_CASE'))

//const transform =  require("./transformer")
//console.log(transform("100"))

const wn = require('./c_to_l')
let ttc =""

let lang = 'fr'

let montant = "179175"

if (montant.includes(",")) {

let montant1 = montant.split(',')[0]
let montant2 = montant.split(',')[1]

ttc = wn(montant1,{lang:lang}).toUpperCase() +" DIRHAMS ET " + wn(montant2,{lang:lang}).toUpperCase() +" CENTIMES"
}
else{
ttc = wn(montant,{lang:lang}).toUpperCase() +" DIRHAMS" 
}

console.log(ttc)
// console.log( wn(montant1,{lang:lang}).toUpperCase() )
// console.log( wn(montant2,{lang:lang}).toUpperCase() )
 

