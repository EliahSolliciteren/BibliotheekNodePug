const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose")
Schema = mongoose.Schema;
//Alles wat met modellen te maken heeftin het enkelvoud houden.


bezoekersSchema = mongoose.Schema({

naam: {voornaam:{
type:String,
trim: true

},

familienaam: {
type: String,
trim: true

}
},

lenen:[{

type:mongoose.Schema.Types.ObjectId,
ref: 'boek'

}],

geleendOp: [Date],

email:{

type: String,
required: true,
trim: true
},

telefoonnummer:{

type: Number


},

reviews: [{

type: mongoose.Schema.Types.ObjectId,
ref: 'review'


}],

reviewBoeken: [{

type: mongoose.Schema.Types.ObjectId,
ref: 'reviewBoeken'


}],

gelezen:[{

    type: mongoose.Schema.Types.ObjectId,
    ref: 'gelezenBoeken'



}]





}),

{

    timestamps: true
    
    


}













bezoekersSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    
    })








module.exports= mongoose.model("bezoeker",bezoekersSchema)
