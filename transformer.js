
                    function transformer(s) {
                        var s   //= document.getElementById('value').value;
                        var th = ['','mille','million', 'milliard','billion'];
                        var dg = ['zéro','un','deux','trois','quatre', 'cinq','six','sept','huit','neuf'];
                        var tn =   ['dix','onze','douze','treize', 'quatorze','quinze','seize', 'dix-sept','dix-huit','dix-neuf'];
   
                    var tw = ['vingt','trente','quarante','cinquante', 'soixante','soixante-dix','quatre-vingt','quatre-vingt-dix'];
                    s = s.toString();
                    s = s.replace(/[\, ]/g,'');
                    if (s != parseFloat(s)) return '#NA';
                    var x = s.indexOf('.');
                    if (x == -1)
                        x = s.length;
                    if (x > 15)
                        return '#NA';
                    var n = s.split(''); 
                    var str = '';
                    var sk = 0;
                    for (var i=0;   i < x;  i++) {
                        if ((x-i)%3==2) { 
                            if (n[i] == '1') {
    
                                str += tn[Number(n[i+1])] + ' ';
                                i++;
                                sk=1;
                            } else if (n[i]!=0) { 
                                if(s!=21 && s!=31 && s!=41 && s!=51 && s!=61 && s!=71 && s!=72 && s!=73 && s!=74 && s!=75 && s!=76 && s!=100 && s!=91 && s!=92 && s!=93 && s!=94 && s!=95 && s!=96){
                                if(s==20 || s==30 || s==40 || s==50 || s==60 || s==70 || s==80 || s==90){
                                str += tw[n[i]-2] + ' ';} // for not to display hyphens for 20,30...90 
                                else{
                                str += tw[n[i]-2] + '-';} // '-'
                                sk=1;
                                }
                            }
                        } else if (n[i]!=0) {
                            if(s!=21 && s!=31 && s!=41 && s!=51 && s!=61 && s!=71 && s!=72 && s!=73 && s!=74 && s!=75 && s!=76 && s!=100 && s!=91 && s!=92 && s!=93 && s!=94 && s!=95 && s!=96){
    
                            str += dg[n[i]] +' ';
                            if ((x-i)%3==0) str += 'cent ';  // for start from 101 - 
    
                            sk=1;
                            }
                        }
                        if ((x-i)%3==1) {
                            if(s!=21 && s!=31 && s!=41 && s!=51 && s!=61 && s!=71 && s!=72 && s!=73 && s!=74 && s!=75 && s!=76 && s!=100 && s!=91 && s!=92 && s!=93 && s!=94 && s!=95 && s!=96){
                            if (sk)
                                str += th[(x-i-1)/3] + ' ';
                            sk=0;
                            }
                        }
                    }
    
                    if (x != s.length) {
                        var y = s.length;
                        //str += 'point ';
                        //for (var i=x+1; i<y; i++)
                        //  str += dg[n[i]] +' ';
                        str += 'virgule ';
                         var counter=0;
                         for (var i=x+1; i<y; i++){
                            if ((y-i)%3==2) { 
                                                if (n[i] == '1') {
                                                                str += tn[Number(n[i+1])] + ' ';
                                                                i++;
                                                                counter=1;
                                                } else if (n[i]!=0) {
                                                                str += tw[n[i]-2] + '-';
                                                                counter=1;
                                                }
                                            }else if (n[i]!=0) { // 0235
                                                str += dg[n[i]] +' ';
                                            }
                         }
    
                    }
    
                    if (s!=21 && s!=31 && s!=41 && s!=51 && s!=61 && s!=71 && s!=72 && s!=73 && s!=74 && s!=75 && s!=76 && s!=100 && s!=91 && s!=92 && s!=93 && s!=94 && s!=95 && s!=96){
                            str = str.replace(/\s+/g,' ')
                        //  document.getElementById("demo").innerHTML = str.replace(/\s+/g,' ')
    
                    }
                    else if (s==21){
                    str = 'vingt-et-un'
                   // document.getElementById("demo").innerHTML = str;
                    }//alert(str.replace(/\s+/g,' '));
                    else if (s==31){
                    str = 'trente-et-un'
                   // document.getElementById("demo").innerHTML = str;
                }
                    else if (s==41){
                    str = 'quarante-et-un'
                   // document.getElementById("demo").innerHTML = str;
                }
                    else if (s==51){
                    str = 'cinquante-et-un'
                   // document.getElementById("demo").innerHTML = str;
                }
                    else if (s==61){
                    str = 'soixante-et-un'
                   // document.getElementById("demo").innerHTML = str;
                }
                    else if (s==71){
                    str = 'soixante-et-onze'
                   // document.getElementById("demo").innerHTML = str;
                }
                    else if (s==72){
                    str = 'soixante-douze'
                   // document.getElementById("demo").innerHTML = str;
                }
                    else if (s==73){
                    str = 'soixante-treize'
                   // document.getElementById("demo").innerHTML = str;
                }
                    else if (s==74){
                    str = 'soixante-quatorze'
                   // document.getElementById("demo").innerHTML = str;
                }
                    else if (s==75){
                    str = 'soixante-quinze'
                   // document.getElementById("demo").innerHTML = str;
                }
                    else if (s==76){
                    str = 'soixante-seize'
                    //document.getElementById("demo").innerHTML = str;
                }
                    else if (s==100){
                    str = 'cent'
                    //document.getElementById("demo").innerHTML = str;
                }
                    else if (s==91){
                    str = 'quatre-vingt-onze.'
                    //document.getElementById("demo").innerHTML = str;
                }
                    else if (s==92){
                    str = 'quatre-vingt-douze'
                    //document.getElementById("demo").innerHTML = str;
                }
                    else if (s==93){
                    str = 'quatre-vingt-treize'
                    //document.getElementById("demo").innerHTML = str;
                }
                    else if (s==94){
                    str = 'quatre-vingt-quatorze'
                    //document.getElementById("demo").innerHTML = str;
                }   
                    else if (s==95){
                    str = 'quatre-vingt-quinze'
                    //document.getElementById("demo").innerHTML = str;
                }   
                    else if (s==96){
                    str = 'quatre-vingt-seize'
                   // document.getElementById("demo").innerHTML = str;
                }
                else if (s==97){
                    str = 'quatre-vingt-dix-sept'
                   // document.getElementById("demo").innerHTML = str;
                }  
               
                return str
                
                }


                //let texte= "un cent un deux un un cent trois"
                //let texte1 = texte.replaceAll(/un cent/g, "")
                //console.log(texte1)
               
                
                let ttc  ="176195,12"
                let ttcS = ttc.toString()
                if (ttcS.includes(",")){
                  var ttc_bv = ttcS.split(",")[0]
                  let   ttc_bv1 = transformer(ttc_bv).replace(/un cent/g, "cent")
                  //console.log(ttc_bv)  
                 // console.log(  checkPoint(ttc_bv1.toUpperCase().trim()) )  
                 console.log(  ttc_bv1.toUpperCase().trim() )  
                  var ttc_av = ttcS.split(",")[1]
               //   console.log(transformer(ttc_bv1),"dirhams")
                //  console.log("et",transformer(ttc_av).trim(),"centimes")
                }else{
                    console.log(transformer(ttc))
                }
                


              //  console.log(transformer(ttcS))

/*
                //console.log(toWords(45800.45))

                 //let aa =   toWords(45800.45).split('virgule')
                 let x= 45800.11.toString()
                 if( x.includes('.')){
                    let aa =   toWords(x).split('virgule') 
                    console.log(aa[0],"dirhams et", aa[1] , "centimes")
                 }
                 else{
                    console.log(toWords(x), "dirhams")
                 }
                 
                 //console.log(aa[0],"dirhams et", aa[1] , "centimes")
     
*/


            function checkPoint(lettre){
                if(lettre.includes('SOIXANTE-DIX-DEUX')){
                    return lettre.replace('SOIXANTE-DIX-DEUX', 'SOIXANTE-DOUZE')
                }
                if(lettre.includes('SOIXANTE-DIX-TROIS')){
                    return lettre.replace('SOIXANTE-DIX-TROIS', 'SOIXANTE-TREIZE')
                }
                if(lettre.includes('SOIXANTE-DIX-QUATRE')){
                    return lettre.replace('SOIXANTE-DIX-QUATRE', 'SOIXANTE-QUATORZE')
                }
                if(lettre.includes('SOIXANTE-DIX-CINQ')){
                    return lettre.replace('SOIXANTE-DIX-CINQ', 'SOIXANTE-QUINZE')
                }
                if(lettre.includes('SOIXANTE-DIX-SIX')){
                    return lettre.replace('SOIXANTE-DIX-SIX', 'SOIXANTE-SEIZE')
                }
                ///////////////////////////////////////////////////////
                if(lettre.includes('QUATRE-VINGT-DIX-DEUX')){
                    return lettre.replace('QUATRE-VINGT-DIX-DEUX', 'QUATRE-VINGT-DOUZE')
                }
                if(lettre.includes('QUATRE-VINGT-DIX-TROIS')){
                    return lettre.replace('QUATRE-VINGT-DIX-TROIS', 'QUATRE-VINGT-TREIZE')
                }
                if(lettre.includes('SOIXANTE-DIX-QUATRE')){
                    return lettre.replace('SOIXANTE-DIX-QUATRE', 'QUATRE-VINGT-QUATORZE')
                }
                if(lettre.includes('SOIXANTE-DIX-CINQ')){
                    return lettre.replace('SOIXANTE-DIX-CINQ', 'QUATRE-VINGT-QUINZE')
                }
                if(lettre.includes('QUATRE-VINGT-DIX-SIX')){
                    return lettre.replace('QUATRE-VINGT-DIX-SIX', 'QUATRE-VINGT-SEIZE')
                }
             
               

            }

            //console.log(  flip('UN DEUX SOIXANTE-DIX-DEUX') )


           module.exports = transformer;