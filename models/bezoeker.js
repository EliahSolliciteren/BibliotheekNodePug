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

lenen:[{

type:mongoose.Schema.Types.ObjectId,
ref: 'boek'

}],

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
    
    })








module.exports= mongoose.model("bezoeker",bezoekersSchema)
