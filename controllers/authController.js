const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const generateToken = require('../utils/generateToken');

module.exports.registerUser =async function(req,res,next){
    try{
        let {email, fullname, password} = req.body;

        let user = await userModel.findOne({email: email});
        if(user) return res.status(401).send('you already have a account. Please Login')

        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message);
                else{
                    let newUser = await userModel.create({
                        fullname,
                        email,
                        password: hash
                      });
                      
                    let token = generateToken(newUser);
                    res.cookie("token",token);
                    res.send("user Created");
                }
            });
        });
    }
    catch(err){
       res.send(err.message);
    }
}

module.exports.loginUser = async function(req,res){
    let {email ,password} = req.body;
    let user = await userModel.findOne({email: email});
        if(!user) return res.status(401).send('Email or password is incorrect')
            
            bcrypt.compare(password, user.password, function(err,result){
               if(result === true){
                let token = generateToken(user);
                res.cookie('token',token);
                res.redirect('/');
               }
               else{
               req.flash('error','Email or password is incorrect');
               res.redirect('/')
               }
            })
}


module.exports.logout = function(req,res,nex){
    res.cookie('token','');
    res.redirect('/');
};