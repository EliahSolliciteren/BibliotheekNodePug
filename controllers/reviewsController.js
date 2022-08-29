const review = require('../models/review.js')
const mongoose =require('mongoose')
const boek = require('../models/boek.js')
const { findByIdAndDelete } = require('../models/boek.js')
const bezoeker = require('../models/bezoeker.js')

module.exports = {




overzicht:(req,res,next)=>{

res.render('reviews/overzicht')


},



createGet: (req,res,next)=>{
console.log(req.query)
    const boekid=req.query.boek
res.render('reviews/create', {boekid: boekid})

},



createPost: (req,res, next)=>{
const id=mongoose.Types.ObjectId(req.query.boek)
console.log(id)
review.create({
    bezoeker: req.user._id,
    boek: id,
    tekst:req.body.tekst,
    score: req.body.score
}, function(error, review){

bezoeker.findByIdAndUpdate(req.user._id ,{$push: {'reviews': review._id}}).exec()
});console.log(id)
bezoeker.findByIdAndUpdate(req.user._id ,{$push: {'reviewBoeken': id }}).exec()
res.redirect('/boeken')

},

editGet:(req,res,next) =>{
console.log(res.locals.review)
const review2=res.locals.review
res.render('reviews/edit' ,{review: review2})

},

editPost: (req,res,next)=>{
id=mongoose.Types.ObjectId(req.params.id)
console.log(req.path)
console.log(req.body)
review.findByIdAndUpdate(id,
{$set: {tekst:req.body.tekst, score: req.body.score}}).exec()
res.locals.redirect='/boeken'; next()           },

delete: (req,res,next)=>{

    id=mongoose.Types.ObjectId(req.params._id)
    boek.findByIdAndDelete(id)
},


reviewsVoorBoek: (req,res,next)=>{
id=mongoose.Types.ObjectId(req.query._id)
boek.find({boek:id}).populate('reviews')


.then(boek=> res.render('boeken/details', {boek:boek}))}
,


reviewZoeken: (req,res,next)=>{
//console.log(req.query)
const boek=req.query.boek
//console.log('boek: '+boek)
console.log(req.params)
const bezoeker=req.params.id
console.log('bezoeker:' +bezoeker)
review.find({boek:boek,bezoeker:bezoeker}).then(review2=>res.render('reviews/edit', {review:review2}))
//zou redirect moeten zijn.

},

redirectView:(req,res,next)=>{
    let redirectPath = res.locals.redirect;
    if (redirectPath) {res.redirect(redirectPath)}
    else{next()}




}


}





































