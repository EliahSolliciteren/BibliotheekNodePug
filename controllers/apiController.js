const boek = require('../models/boek.js')
const mongoose =require('mongoose')
httpStatus = require("http-status-codes")

module.exports = {



alleBoeken: (req, res,next) =>{

boek.find().populate('reviews').then(boeken2=>{
res.locals.boeken=boeken2; next()})
//next(error)
    },


JSON: (req,res) =>{

    res.json(
        {
       status: 200, 
        data:res.locals.boeken
})
next(error)},

JSONerror: (req,res,next,error) =>{

if (error){
let errorObject={
    status: 500/*httpStatus.INTERNAL_SERVER_ERROR*/,
    message: error.message
}
    
    res.json(errorObject);
}  
}



}












