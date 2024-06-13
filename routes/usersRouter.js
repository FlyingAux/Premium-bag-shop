const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

router.get('/',function(req,res){
    res.send('welcome u');
});

router.post('/register',function(req,res,next){
    try{
        let {email, fullname, password} = req.body;

        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message);
                else{
                    let newUser = await userModel.create({
                        fullname,
                        email,
                        password: hash
                      });
              
                    let token = jwt.sign({email, id: newUser._id},"heyheyhey");
                    res.cookie("token",token);
                    res.send("user Created");
                }
            });
        });

      
    }
    catch(err){
       res.send(err.message);
    }
});


module.exports = router;