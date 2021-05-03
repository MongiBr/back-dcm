const {User,validateUser,validateLogin} = require('../models/user.model');

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.route('/').get((req,res)=>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: '+ err));
})

//User Register
router.post('/register',async(req,res)=>{
    
   const {error}=validateUser(req.body)
   if(error) return res.send({status:false,message:error.details[0].message})

   const emailExist = await User.findOne({ email: req.body.email});
   if(emailExist) return res.send({status:false,message:'Email user before'});

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

   
    
    const user=new User({
       nom:req.body.nom,
       prenom:req.body.prenom,
       telephone:req.body.telephone,
       adresse:req.body.adresse,
       profession:req.body.profession,
        email:req.body.email,
       specialisation:req.body.specialisation,
       password: hashPassword,
       ville: req.body.ville,
       pays: req.body.pays,
       codePostal: req.body.codePostal,
       company: req.body.company,
    })
    const result=await user.save()

  
    user.save().then(()=>res.json('added')).catch(err=>res.status(400).json('Error: '+err));
    

    
})
//User login 

router.post('/login',async(req,res)=>{
   
    const {error}=validateLogin(req.body)
    if(error) return res.status(400).send({status:false,message:error.details[0].message})
    
    const user = await User.findOne({ email: req.body.email});
    if(!user) return res.send({status:false, message:'re-enter your data'});

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.send({status:false, message:'re-enter your data'})    

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({status:true, email: user.email, token:token, role: user.role});
    });

})


module.exports=router
