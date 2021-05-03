const mongoose = require('mongoose');
const Joi=require('joi')

const Schema= mongoose.Schema;


const patientSchema = new Schema({
    
    id: {type: String, default: ""},
    nom: {type: String, default: ""},
    description : {type: String, default: ""},
    imageList : [{
     imageUrl:{type:String,required:true},
     
 }]
    
     
  },
  {
       timestamps: true 
  },)
  
 function validatePatient(patient){
    let imageItem = Joi.object().keys({
        imageUrl:Joi.string().required(),
    })

    
    const schema=Joi.object({
    
        id: Joi.string().required(),
        nom: Joi.string().required(),
        description: Joi.string().required(),
        
        imageList:Joi.array().items(imageItem),
      
        
    })

    return schema.validate(patient)
}

  const Patient = mongoose.model('Patient',patientSchema);

  module.exports.Patient = Patient;
  module.exports.validatePatient=validatePatient