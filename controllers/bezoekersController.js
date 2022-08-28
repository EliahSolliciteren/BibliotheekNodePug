const bezoeker = require('../models/bezoeker.js')
const mongoose =require('mongoose')
const passport = require("passport")
const passportLocalMongoose=require('passport-local-mongoose')
const { findByIdAndRemove, findById } = require('../models/bezoeker.js')
const { body, validationResult,  checkSchema} = require('express-validator');
const path = require('path');
//Catch nog




module.exports = {

    overzicht: (req,res,next)=>{
       
        bezoeker.find().then((bezoekers)=>{
        
        
        res.render('bezoeker/overzicht', {bezoekers:bezoekers})}
        )},



nieuweAccount: (req,res,next)=>{

res.render('bezoeker/create')



},

validatie:

checkSchema({
voornaam:{ 
    trim:true,
    notEmpty:{
        errorMessage: 'Gelieve een naam op te geven.',
        bail: true

    } ,
    isLength: {

        option: [{min:2, max:15 }],
        errorMessage: 'Gelieve een geldige voornaam op te geven.'
    }
},    
familienaam: {
    trim:true,
    notEmpty:{
        errorMessage: 'Gelieve een familienaam op te geven.',
        bail: true

    } ,
    isLength: {

        option: [{min:3, max:15 }],
        errorMessage: 'Gelieve een geldige familienaam op te geven.'
    },
},
email: {
trim: true,
normalizeEmail: true,
notEmpty:{
    errorMessage: 'Gelieve een emailadres op te geven',
    bail:true
},
isEmail:{ 
    errorMessage: 'Gelieve een geldig emailadres te geven',
bail:true
},

custom:{
    options(value, req, path) {
    return bezoeker.findOne({email:value}).then(user => {
      if (user /*&& (req.path).indexOf('registreren')==1*/) {
        return Promise.reject('Er is al iemand met deze email geregistreerd');
          }
        else{}})}
        }},
telefoonnummer:{
//sanitizer: replace ([/], '')
isLength:{
options: [{min:9, max:12}],
errorMessage: 'Gelieve een geldig telefoonnummer te geven.'

}
}}),

validatie2: (req,res,next)=>{

    const error = validationResult(req)
    
    if (!error.isEmpty()){
    req.skip=true
    
    
    let messages = error.array().map(e => e.msg);
    req.flash("validatie", messages)
    
    
    res.redirect('/bezoekers/registreren')}
    else{next()}
     } ,











registreren: (req,res,next)=>{
   console.log(path)
    
    BezoekerGegevens = (body)=>{
        return{
        
        naam:{voornaam : body.voornaam,
        familienaam : body.familienaam},
        email : body.email,
        telefoonnummer : body.telefoonnummer,
        //{email:req.body.email}
        }}
        
        let nieuweBezoeker= new bezoeker(BezoekerGegevens(req.body))
        console.log(nieuweBezoeker)
        bezoeker.register(nieuweBezoeker, req.body.password, function(e,gevonden){
        if (e){
        console.log(e)}
        
        if(gevonden){console.log(gevonden);next()}
        else{console.log('niet gelukt');}
        })},

        delete:(req,res,next)=>{
            const id=mongoose.Types.ObjectId(req.params.id)
            console.log(id)
            bezoeker.findByIdAndRemove(id).exec().then(()=>{res.locals.redirect='/bezoekers'})
           next() },

            redirectView:(req,res,next)=>{
                let redirectPath = res.locals.redirect;
                if (redirectPath){res.redirect(redirectPath)}
                else {next()};
        
            },

authentificatiePost:(req,res,next)=>{console.log(req.body);passport.authenticate('local',{successRedirect: "/bezoekers", failureRedirect:"/boeken"})(req,res,next)}

,

authentificatieGet:(req,res,next)=>{res.render('/bezoekers')},




afmelden: (req,res,next)=>{
    
    req.flash("afmelden", "Je bent afgemeld");
    res.redirect("/")
    next()
    },
    



updateGet: (req,res,next)=>{

    id = req.params.id
    console.log(id)
bezoeker.findById(mongoose.Types.ObjectId(id)).then((eenBezoeker)=>{

res.render('bezoeker/edit',{bezoeker:eenBezoeker})
})},


updatePost: (req,res,next)=>{
    const id = mongoose.Types.ObjectId(req.params.id)
    const voornaam= req.body.voornaam
    const familienaam = req.body.familienaam
    const email=req.body.email
    const telefoonnummer = req.body.telefoonnummer
    console.log(req.body)
    bezoeker.findByIdAndUpdate(id,
{$set: {'naam.voornaam':voornaam, 'naam.familienaam': familienaam,'email' :email, 'telefoonnummer':telefoonnummer}})
.then(updated=>{ res.redirect('/bezoeker')})
    },



leenoverzicht: (req,res,next)=>{
//console.log(req.user)
bezoeker.findById(req.user._id).populate('lenen').then(resultaat=>
{res.render('bezoeker/leenoverzicht',{geleend:resultaat})})
//.then(user2=>{console.log(user2);res.render('bezoeker/leenoverzicht',{geleend:user2})})




},






























    























}    
