const mongoose = require('mongoose')

Schema = mongoose.Schema;


reviewSchema = mongoose.Schema({

Rating:{

type: Number


},



bezoeker: {


    type: mongoose.Schema.Types.ObjectId, //MSTO
    ref: "bezoeker"

},

boek : {

    type: mongoose.Schema.Types.ObjectId, //MSTO
    ref: "boek"
  


, }}),
{

    timestamps: true
    
    



}



















module.exports= mongoose.model("review", reviewSchema)
