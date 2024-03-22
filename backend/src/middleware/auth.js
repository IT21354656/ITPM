
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const { UserModel } = require('../models/userModel');

const authenticateUserMiddleware = (req,res,next)=>{
    console.log(UserModel)

    const token = req.cookies.jwt;

    if(token){
 
     jwt.verify(token,'vufuifhf65465357fvgg76r6754uyfgu',(err,decoded)=>{
 
         if(err){
             console.log(err.message);
             res.status(500).json("invalid token");
         }
         else{
      console.log(decoded._id)
               UserModel.findOne({_id:decoded._id}).then(r=>{
                req.body.user = r;
                next();
  
             }).catch(er=>{
                return res.status(404).json({msg:"user not found",code:500});
             })
             
         }
 
     })
 
    }
    else{
        return res.status(404).json({msg:"token not found",code:500});
    }
 
 
 }

 module.exports = {authenticateUserMiddleware};