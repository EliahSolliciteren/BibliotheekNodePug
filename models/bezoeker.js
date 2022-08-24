const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose")
Schema = mongoose.Schema;



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

email:{

type: String,
required: true,
trim: true
},

telefoonnummer:{

type: Number


}}),

{

    timestamps: true
    
    


}













bezoekersSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    paswordField: "wachtwoord"
    })








module.exports= mongoose.model("bezoeker",bezoekersSchema)
