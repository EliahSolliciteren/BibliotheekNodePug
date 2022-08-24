
const mongoose = require('mongoose')
Schema = mongoose.Schema;




boekenSchema = mongoose.Schema({

titel: {
type: String,
trim: true

},

auteur: {

type: String,
trim: true


},

uitgever: {

type: String,
trim: true


},

bladzijden: {

type: String,
trim: true


},

tagsGenre:[{

type: String,




}],

tagsLeeftijd: [{
type:String


}],

reviews: [{

type: mongoose.Schema.Types.ObjectId, //MSTO
ref: "review"



}],



Uitgeleend: {

type: Boolean,
default:false

},


UitgeleendTot:{

type: Date,


},})
{

timestamps: true

}
    
    
    
    



module.exports= mongoose.model("boek", boekenSchema)





