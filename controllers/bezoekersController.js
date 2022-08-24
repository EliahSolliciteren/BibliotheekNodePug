const bezoeker = require('../models/bezoeker.js')
const mongoose =require('mongoose')
const passport = require("passport")
const passportLocalMongoose=require('passport-local-mongoose')
const { findByIdAndRemove } = require('../models/bezoeker.js')

//Catch nog




module.exports = {

    overzicht: (req,res,next)=>{
       
        bezoeker.find().then((bezoekers)=>{
        
        
        res.render('bezoeker/overzicht', {bezoekers:bezoekers})}
        )},



nieuweAccount: (req,res,next)=>{

res.render('bezoeker/create')



},


registreren: (req,res,next)=>{
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
                if (redirectPath) res.redirect(redirectPath);
                else {next()};
        
            },

authentificatiePost:(req,res,next)=>{console.log(req.body);passport.authenticate('local',{successRedirect: "/bezoekers", failureRedirect:"./aanmelden"})(req,res,next)}

,

authentificatieGet:(req,res,next)=>{res.render('./bezoekers/aanmelden')},




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
    const telefoonnummer = req.body.telefoonnumer
    bezoeker.findByIdAndUpdate(id,
{$set: {'naam.voornaam':voornaam, 'naam.familienaam': familienaam,'contactgegevens.email' :email, 'contactgegevens.telefoonnummer':telefoonnummer}})
.then(updated=>{ res.render('./bezoeker/details', {bezoeker:updated})})
    }































    























}    
