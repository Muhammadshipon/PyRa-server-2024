const express = require('express');
const router = express.Router();
const {getDB} = require('../config/db');


    // get single user info 
router.get('/:email',async(req,res)=>{
const db = getDB();
const email = req.params.email ;
console.log(email);
const query = {email};
const user = await db.collection('users').findOne(query);
res.send({msg:'get user info successfully',user})
})

module.exports= router;