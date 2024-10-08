const express = require('express');
const router = express.Router();
const {getDB} = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// const {customMiddleware} = require('../middlewares/authMiddleware')



          //  route for create users 
router.post('/create-users',async(req,res)=>{
  const{name,dateOfBirth,gender,email,password}=req.body;
  try{
    const db =getDB();
    const user = await db.collection('users').findOne({email});
    if(user){return res.status(400).json({msg:'user already exist'})}
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = {
      name, dateOfBirth, gender , email, password: hashedPassword
    }
    // insert the user into the database 
    await db.collection('users').insertOne(newUser);

    // create and send JWT 
    const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    res.status(200).json({token,newUser})
  }
  catch(err){
   console.error(err.message);
   res.status(500).send('Server error')
  }
})
          //  route for login users 
router.post('/login',async(req,res)=>{
  const{email,password}=req.body;
  try{
    const db =getDB();
    const user = await db.collection('users').findOne({email});
    if(!user){return res.status(400).json({msg:'Invalid Credentials'})}
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({msg:'Invalid Credentials'})
    }
  
    // create and send JWT 
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    res.status(200).json({token,msg:"login successfully"})
  }
  catch(err){
   console.error(err.message);
   res.status(500).send('Server error')
  }
})

module.exports= router