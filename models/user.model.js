const mongoose = require('mongoose');
const Joi=require('joi')


const Schema= mongoose.Schema;

const userSchema = new Schema({
    
   nom: {type: String, default: ""},
    prenom: {type: String, default: ""},
    password: {type: String, default: ""},
    email: {type: String, default: "", unique: true},
   specialisation: {type: String, default: ""},
   telephone: {type: String,trim: true, default: ""},
   adresse: {type: String, default: " "},
   ville: {type: String, default: " "},
   pays: {type: String, default: " "},
   profession: {type: String, default: "user"},
   codePostal: {type: String,trim: true, default: " "},
   company: {type: String, default: " "},
    
 },
 {
      timestamps: true 
 },)
 //required: true,

 function validateUser(user){

    
     const schema=Joi.object({
     
         nom: Joi.string().allow('', null),
         prenom: Joi.string().allow('', null),
         telephone: Joi.string().allow('', null),
         adresse: Joi.string().allow('', null),
         ville: Joi.string().allow('', null),
         pays: Joi.string().allow('', null),
         profession:Joi.string().allow('', null),
         email: Joi.string().email(),
         specialisation: Joi.string().allow('', null),
         password: Joi.string().min(6).required(),
         codePostal: Joi.string().allow('', null),
         company: Joi.string().allow('', null),
     })
 
     return schema.validate(user)
 }
 function validateLogin(login){

     const schema2 = Joi.object({
         email:Joi.string().required().email(),
         password:Joi.string().min(6).required()
     })
 
     return schema2.validate(login)
 }

 const User = mongoose.model('User',userSchema);

 module.exports.User = User;
 module.exports.validateLogin=validateLogin
 module.exports.validateUser=validateUser;