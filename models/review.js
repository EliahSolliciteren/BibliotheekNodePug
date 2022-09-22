const mongoose = require('mongoose')

Schema = mongoose.Schema;


reviewSchema = mongoose.Schema({

score: {

type: Number


},



bezoeker: {


    type: mongoose.Schema.Types.ObjectId, //MSTO
    ref: "bezoeker"

},

boek : {

    type: mongoose.Schema.Types.ObjectId, //MSTO
    ref: "boek"
  


 },

 tekst:{

type: String, 
trim: true

 }



}),
{

    timestamps: true
    
    



}



















module.exports= mongoose.model("review", reviewSchema)
