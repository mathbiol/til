console.log('til.js loaded :-)')

til=function(){
    // ini
    console.log('til initialized at'+Date())
    til.loadTsv().then(function(tsv){
        til.dt = til.dt||{}
        til.all_indices_ap = til.tsv2tab(tsv)
        console.log('done')
    })
}

til.loadTsv = async function(url){
    url = url||'all_indices_ap.csv'
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
    return tab
}

if(typeof(exports)!="undefined"){
    exports.til=til
    exports.hello=function(){
        return 'hello world at'+Date()
    }
}

if(typeof('define'!='undefined')){
    define(til)
}

//til()