const boek = require('../models/boek.js')
const mongoose =require('mongoose')
const { findByIdAndDelete, find, findOneAndUpdate } = require('../models/boek.js')
const flash = require('flash')
const { body, validationResult,  checkSchema} = require('express-validator');
const bezoeker = require('../models/bezoeker.js');





module.exports = {



createGet:(req,res,next)=> {

res.render('boeken/create')

},


validatie:checkSchema({

    titel: {
trim: true,    
   notEmpty:{ 
     errorMessage: 'Geen titel opgegeven',
    bail: true,
   },
isLength:{ 

    options: [{min:3 , max:75}],
    errorMessage: 'Titel niet geldig',
    },
},

uitgever:{
    
        trim: true,    
           notEmpty:{
             errorMessage: 'Gelieve een uitgever op te geven',
        bail: true,    
           },
        isLength:{ 
        
            options: [{min:2 , max:30}],
            errorMessage: 'Gelieve de uitgever na te lezen.',
            },
        
        }, 
        auteur: {
            trim: true,
      
          isLength:{ 
              options: [{min:2,max: 75}], 
               errorMessage: 'Geen auteur opgegeven',
          },
        },

        bladzijden: {
    
            isInt: {
            options:     {min: 1 },
        errorMessage: 'Ongeldig aantal bladzijden',
        }},

        tagsGenre: {
            notEmpty: true,
            errorMessage: 'Duid minstens één genre aan' 
        },
        tagsLeeftijd: {
            notEmpty: true,
            errorMessage: 'Voor welke leeftijdscategie is dit boek?' 
        }

    }),

validatie2:(req,res,next)=>{
    const error = validationResult(req)
    
    if (!error.isEmpty()){
 req.skip=true
    
    
    let messages = error.array().map(e => e.msg);
    req.flash("validatie", messages)
    
    
    res.redirect('/boeken/create')}
    else{next()}
},
 














createPost: (req,res,next)=>{
  




console.log('te ver')

    boek.create({
titel:req.body.titel,
auteur: req.body.auteur,
bladzijden: req.body.bladzijden,
versies: req.body.versies,
tagsGenre: req.body.tagsGenre,
tagsLeeftijd: req.body.tagsLeeftijd,
    }).then((nieuwBoek)=>{
    req.flash('Create', nieuwBoek.titel + 'van' + nieuwBoek.auteur + 'is toegevoegd aan de database' )
    boek.find().then((alleBoeken)=>{let boeken=alleBoeken
    
    res.render('boeken/overzicht', {'Create':req.flash('Create'), boeken:boeken})
    })
    })
},


overzicht: (req,res,next)=>{

    boek.find().then(alleBoeken=>{
res.render('boeken/overzicht', {boeken:alleBoeken})
})
},


details: (req, res,next)=>{

const id=mongoose.Types.ObjectId(req.params.id) 

boek.findById(id).then(opgezocht=>{
   
    
res.render('boeken/details', {boek:opgezocht})
})
},

delete:(req,res,next)=>{
console.log(req.path)
    const id=mongoose.Types.ObjectId(req.params.id)

    console.log(id)
    boek.findByIdAndRemove(id).exec().then(()=>{res.locals.redirect='/boeken'})

},

lenen:(req,res,next)=>{
    const id=mongoose.Types.ObjectId(req.params.id)
    //console.log(req.user)
    const vandaag = new Date(); 
    console.log(vandaag)
bezoeker.findByIdAndUpdate(req.user._id, {$push:{'lenen': [id], 'geleendOp': [vandaag] }}).exec()
.then(()=>{ 

    boek.findByIdAndUpdate(id,{$push:{'UitgeleendOp': [vandaag] }},{"returnNewDocument" : true}).exec().then(boek=>{console.log(boek.UitgeleendOp.length)})
    //Dit artefact laat ik staan voor educatieve doeleinde
    req.flash("lenen", "Veel leesplezier")

res.redirect("/boeken");
})},

binnenbrengen: (req,res,next)=>{
    const id=mongoose.Types.ObjectId(req.params.id)
const datum =  new Date(req.query.datum )
console.log(datum)
var voor= new Date(datum.getTime()-1000-7200000)


var na= new Date(datum.getTime()+1000-7200000)
if (datum>voor){console.log('ok')}
console.log(datum)
console.log(voor)
console.log(na)
boek.find({'UitgeleendOp':{ $gte: voor,$lte: na} }).exec().then(boeken=>{
   //console.log(boeken)
    
    for(var i=0; i< boeken[0].UitgeleendOp.length;i++ ){
     // console.log(boeken[0].UitgeleendOp[i].getTime())
  //   console.log(voor)  
     if (boeken[0].UitgeleendOp[i].getTime() > voor.getTime() && boeken[0].UitgeleendOp[i].getTime()<na.getTime() ){
        console.log(boeken[0].UitgeleendOp[i] )
        const gezocht=boeken[0].UitgeleendOp[i]
console.log(gezocht); console.log(boeken[0]._id)
    boek.findOneAndUpdate(boeken[0]._id, { $pull:{'UitgeleendOp':gezocht}}).exec()
    .then(console.log(gezocht), bezoeker.findOneAndUpdate(req.User._id, {$pull:{geleendOp:gezocht}}).exec())
    .then(()=>bezoeker.findOneAndUpdate(req.user._id, {$pull:{lenen:id}}).exec())
}


    }

});}


//boek.findByIdAndUpdate(id,{$push:{'UitgeleendOp': [vandaag] }},{"returnNewDocument" : true}).exec().then(boek=>{console.log(boek.UitgeleendOp.length)})

//boek.findOneAndUpdate({'UitgeleendOp':{ $gte: Date(voor),$lte: Date(na)}})
//, {$pull:{'UitgeleendOp':[datum]}}).exec().then(bezoeker.findByIdAndUpdate(req.user._id, {$pull:{'geleendOp':[datum]}}).exec())
//bezoeker.findByIdAndUpdate(req.user._id, {$pull:{'lenen':[id]}}).exec()
//flash('binnengebracht', 'Het boek is binnengebracht!')
//res.redirect('/bezoekers/leenoverzicht')

,

redirectView:(req,res,next)=>{
        let redirectPath = res.locals.redirect;
        if (redirectPath) {res.redirect(redirectPath)}
        else{next()}
        



}
}















