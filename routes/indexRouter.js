
 const express = require('express')
 const router= require('express').Router()
 
 
 bezoekerRouter=require("./bezoekerRouter.js")
 boekRouter=require("./boekRouter.js")
 reviewRouter=require("./reviewRouter.js")
 //homeRouter=require("./homeRouter.js")
 //router.use('/',homeRouter)
 router.use("/bezoekers",bezoekerRouter)
 router.use("/reviews",reviewRouter)
 router.use("/boeken",boekRouter)
 
 
 
 module.exports = router;

 
 
 
 
 
 
 
 
 
 
 
 router.use('*', function(req,res){
 
 res.send('Pagina niet gevonden')
 
 res.status(404)
 
 })
 
 