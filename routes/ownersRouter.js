const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner');
const isAdmin = require('../middlewares/isAdmin');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');


if(process.env.NODE_ENV === "development"){
    router.post('/create',async function(req,res){
        let owner = await ownerModel.find();
        if(owner.length>0){
            return res.status(500).send('you dont have permission to create a new owner');
        }
        let {email, fullname, password ,role} = req.body;
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err) return res.send(err.message);
                else{
                    let newUser = await ownerModel.create({
                        fullname,
                        email,
                        password: hash,
                        role
                      });
                      
                    let token = generateToken(newUser);
                    res.cookie("token",token);
                    res.send("owner Created");
                }
            });
        });
    }); 
}


router.get('/',function(req,res,next){
    res.render('owner-login');
})

router.post('/owner-login', async function(req,res){
    let {email ,password} = req.body;
    let user = await ownerModel.findOne({email: email});
        if(!user) return res.status(401).send('Email or password is incorrect')
            
            bcrypt.compare(password, user.password, function(err,result){
               if(result === true){
                let token = generateToken(user);
                res.cookie('token',token);
                res.redirect('/owners/admin');
               }
               else{
               req.flash('error','Email or password is incorrect');
               res.redirect('/owners')
               }
            })
})

router.get('/admin',isAdmin,function(req,res){
    let success = req.flash('success');
    res.render('createproducts', { success });
});

module.exports = router;