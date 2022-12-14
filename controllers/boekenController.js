const boek = require('../models/boek.js')
const mongoose =require('mongoose')
const { findByIdAndDelete, find, findOneAndUpdate } = require('../models/boek.js')
const flash = require('flash')
const { body, validationResult,  checkSchema} = require('express-validator');
const bezoeker = require('../models/bezoeker.js');
const { MongoNotConnectedError } = require('mongodb');





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

versies: {
isInt: {
    options: {min: 1},
    errorMessage: 'Ongeldig aantal versies'
}
 


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
  


    boek.create({
titel:req.body.titel,
auteur: req.body.auteur,
bladzijden: req.body.bladzijden,
uitgever: req.body.uitgever,
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


reviewsVoorBoeken: (req,res,next)=>{
    id=mongoose.Types.ObjectId(req.params.id)
    console.log(id)
    boek.findOne({_id:id}).populate('reviews')
    
    
    .then(boek=>{res.render('boeken/details', {boek:boek})})}
    ,

editGet: (req,res,next)=>{
    const id = mongoose.Types.ObjectId(req.params.id)
console.log(id)
    boek.findById(id).then(boek=>{console.log(boek);
    res.render('boeken/edit', {boek:boek})
    })
},

editPost: (req,res,next)=>{
const id = mongoose.Types.ObjectId(req.params.id)
const titel=req.body.titel;
const auteur = req.body.auteur;
const uitgever=req.body.uitgever;
const bladzijden = req.body.bladzijden;
const versies = req.body.versies;
const tagsGenre= req.body.tagsGenre;
const tagsLeeftijd= req.body.tagsLeeftijd;
boek.findByIdAndUpdate(id, {$set: {titel:titel, auteur:auteur, uitgever:uitgever, bladzijden:bladzijden, versies:versies, tagsGenre:tagsGenre, tagsLeeftijd: tagsLeeftijd}})
.then(()=>res.redirect('/boeken'))


},  



delete:(req,res,next)=>{
console.log(req.path)
    const id=mongoose.Types.ObjectId(req.params.id)

    console.log(id)
    boek.findByIdAndRemove(id).exec().then(()=>res.locals.redirect='boeken')
next()
},

lenen:(req,res,next)=>{
    const id=mongoose.Types.ObjectId(req.params.id)
   
    const vandaag = new Date(); 
    console.log(vandaag)
bezoeker.findByIdAndUpdate(req.user._id, {$push:{'lenen': [id], 'geleendOp': [vandaag] }}).exec()
.then(()=>{ 

    boek.findByIdAndUpdate(id,{$push:{'UitgeleendOp': [vandaag] }},{"returnNewDocument" : true}).exec().then(boek=>{console.log(boek.UitgeleendOp.length)})
    //Dit artefact laat ik staan voor educatieve doeleinde
    req.flash("lenen", "Veel leesplezier")

res.redirect("/boeken");
}).catch(error=>res.redirect('/'))},

binnenbrengen: (req,res,next)=>{
    const id=mongoose.Types.ObjectId(req.params.id)
const datum =  (req.query.datum)


boek.find({'UitgeleendOp':datum }).exec().then(boeken=>{
 
  //Hier zit een fout
    for(var i=0; i< boeken[0].UitgeleendOp.length;i++ ){
   

     if (boeken[0].UitgeleendOp[i]==datum ){
        console.log(boeken[0].UitgeleendOp[i] )
        const gezocht=boeken[0].UitgeleendOp[i]

    boek.findOneAndUpdate(boeken[0]._id, { $pull:{'UitgeleendOp':gezocht}}).exec()
    .then(bezoeker.findOneAndUpdate(req.user._id, {$pull:{geleendOp:gezocht}}).exec())
    .then(()=>bezoeker.findOneAndUpdate(req.user._id, {$pull:{lenen:id}}).exec())
res.locals.redirect='/bezoekers/leenoverzicht' ;next()//Als je hetzelfde boek meerdere keren uitleend brengt hij ze allemaal terug
}

    
    }

});},


zoeken:(req,res,next)=>{
    titel=req.query.titel
    auteur=req.query.auteur
    uitgever=req.query.uitgever
    if (titel)
    {
        boek.find({titel:{ $regex: titel ,$options: 'i'  }})
        .then((boek1)=>{
            if (boek1.length==1)
            {console.log(boek1)
                res.render('boeken/overzicht', {boeken:boek1})}
        else if (boek1.length==0){next()}
        
        
        else {

console.log('geen resultaat met titel')
    if(auteur)  // Meerdere of geen boeken op titel
    {console.log('met auteur');boek.find({auteur: {$regex: auteur ,$options: 'i'  },titel:{ $regex: titel ,$options: 'i'  }})
    .then(boek2=> 
    {console.log(boek2); if (boek2.length==1) {res.render('boeken/overzicht', {boeken:boek2})}
    else if (boek2.length>1){
    
        if(uitgever) // Na 2 selecties houden we meer dan 1 resultaat over
        {console.log('met uitgever');boek.find({auteur:{ $regex: auteur ,$options: 'i'  },titel:{ $regex: titel ,$options: 'i'  },auteur :{ $regex: auteur ,$options: 'i'  }}).then(boek3=>
        {if (boek3.length>0){res.render('boeken/overzicht', {boeken:boek3})}}      )
        }else {res.render('boeken/overzicht',{boeken:boek2})}
    }
    else
    {res.render('boeken/overzicht', {boeken:boek1})}})
}
if (uitgever)
{boek.find({titel:{ $regex: titel ,$options: 'i'  },uitgever:{ $regex: uitgever ,$options: 'i'  }})
.then(boek7=> {if(boek7.length==1){res.render('boeken/overzicht',{boeken:boek7})}
else{next()}})}
else{
res.render('boeken/overzicht', {boeken:boek1})

}
}}   
        
                
                
)}
else{next()}
},
    
zoeken2: (req,res,next)=>{console.log('next()')
if (auteur){{boek.find({auteur:{ $regex: auteur ,$options: 'i'  }})
.then(boek4=>
{ if(boek4.length ==0){
if (uitgever)
{boek.find({uitgever:{ $regex: uitgever ,$options: 'i'  }})
.then(boek5=>{if (boek5.length==0){next()}else{
res.render('boeken/overzicht', {boeken:boek5})


}})}}
else if (boek4.length==1){
    res.render('boeken/overzicht', {boeken:boek4})}
    else{res.render('boeken/overzicht', {boeken:boek4})}})}}
else if (uitgever){ //nog meer dan 1 over na auteur
    boek.find({auteur:{ $regex: auteur ,$options: 'i'  },uitgever:{ $regex: uitgever ,$options: 'i'  } })
    .then(boek6=> {if(boek6.length>0){res.render('boeken/overzicht',{boeken:boek6})}})
}else {req.flash('geenResultaat',"Geen boek gevonden met de opgegeven criteria"); res.locals.redirect='/boeken';next()}}



,
zoeken3:(req,res,next)=>{



},






redirectView:(req,res,next)=>{
        let redirectPath = res.locals.redirect;
        if (redirectPath) {res.redirect(redirectPath)}
        else{next()}
        



}















}
