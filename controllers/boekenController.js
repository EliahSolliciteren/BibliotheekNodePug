const boek = require('../models/boek.js')
const mongoose =require('mongoose')
const { findByIdAndDelete, find } = require('../models/boek.js')
const flash = require('flash')
const { body, validationResult,  checkSchema} = require('express-validator');





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

redirectView:(req,res,next)=>{
        let redirectPath = res.locals.redirect;
        if (redirectPath) {res.redirect(redirectPath)}
        else{next()}
        



}
}















