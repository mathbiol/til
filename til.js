//console.log('til.js loaded :-)');

if(typeof(fetch)=="undefined"){ // if we're in node
    fetch = require('node-fetch')
}

til=function(){
    // ini
    console.log('til initialized at'+Date())
    til.loadTsv().then(function(tsv){
        //til.dt = til.dt||{}
        til.all_indices_ap = til.tsv2tab(tsv)
        console.log('done')
    })
}

til.loadTsv = async function(url){
    url = url||'https://mathbiol.github.io/til/all_indices_ap.csv'
    var p = (await fetch(url)).text()
    return p
}

til.tsv2tab = function(tsv){
    var x = tsv.split(/[\n\r]/)
    var parms = JSON.parse('['+x[0]+']')
    var tab = {}
    parms.forEach(function(p){
        tab[p]=[]
    })
    x = x.slice(1).forEach(function(r){
        r = r.replace(/"/g,'')
        r.split(',').forEach(function(ri,i){
            tab[parms[i]].push(ri)
        })
    })
    // make sure numeric parameters are types as such
    Object.keys(tab).forEach(parm=>{
        if(!isNaN(parseFloat(tab[parm][0]))){
            tab[parm]=tab[parm].map(x=>parseFloat(x))
        }
    })
    return tab
}

til.unique=function(ar,pat){ //looks for all versions of pattern in array
    pat=pat||'TCGA-([^-]+)'
    pat=RegExp(pat)
    var k={}
    ar.forEach((a,i)=>{
        var ka = a.match(pat)
        if(ka){
            ka=ka[1]
            if(!k[ka]){k[ka]=[]} // initiatize counter if not ther already
            k[ka].push(i)
        }
    })
    return k
}


//if(typeof(define)!=="undefined"){
//    define({til:til})
//}


if(typeof(define)!=="undefined"){
    define({
        loadTsv:til.loadTsv,
        tsv2tab:til.tsv2tab
    })
}

