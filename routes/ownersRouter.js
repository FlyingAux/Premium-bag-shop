const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner');
const isLoggedIn = require('../middlewares/isLoggedIn');


if(process.env.NODE_ENV === "development"){
    router.post('/create',async function(req,res){
        let owner = await ownerModel.find();
        if(owner.length>0){
            return res.status(500).send('you dont have permission to create a new owner');
        }
        let { fullname,email,password } = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
    }); 
}


router.get('/admin',isLoggedIn,function(req,res){
    let success = req.flash('success');
    res.render('createproducts', { success });
});

module.exports = router;