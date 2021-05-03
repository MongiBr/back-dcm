
const {Patient,validatePatient} = require('../models/patient.model');

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/').get((req,res)=>{
    Patient.find()
        .then(patient => res.json(patient))
        .catch(err => res.status(400).json('Error: '+ err));
})


//patient add
router.post('/addPatient', async(req,res)=>{
    const {error}=validatePatient(req.body)
    if(error) return res.send({status:false,message:error.details[0].message})


    // if(req.user.user.role != "admin") return res.status(401).send({status:false})
    
//    const nbr = await Patient.countDocuments({});
//    const num = nbr + 1;
    
    const patient=new Patient({
       id:req.body.id,
       nom:req.body.nom,
       description:req.body.description,
       imageList :req.body.imageList

     
    })
    const result=await patient.save()

  
    patient.save().then(()=>res.json('added')).catch(err=>res.status(400).json('Error: '+err));
    

    
})

//User verify 


function verifytoken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== 'undefined'){
   
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secretkey', (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else{
                req.user = authData;
                next();
            }
        });
    
    }else{
      console.log("etape100");
       res.sendStatus(401);
    }
  
  }


module.exports=router
