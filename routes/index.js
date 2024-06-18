const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/',function(req,res,next){
    let error = req.flash('error');
    res.render('index',{error});
})


router.get('/shop',isLoggedIn,async function(req,res,next){
    let products = await productModel.find()
    res.render('shop',{products});
    console.log(products)
})


router.get('/cart/:pid',async function(req,res,next){
    let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
    let user = await userModel.findOne({email: decoded.email}).select("-password");

    let product = await productModel.find({_id: req.params.pid});

    if(user.cart.indexOf(product._id) !== -1){
        let index1 = user.cart.indexOf(product._id);
        user.cart.splice(index1 , 1);
    }
    else{
        user.cart.push(product._id);
    }
    await user.save();
    res.redirect('/cart');
})

router.get('/cart',isLoggedIn,async function(req,res,next){
    let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
    let user = await userModel.findOne({email: decoded.email}).select('-password').populate('cart')
    console.log(user)
    res.render('cart',{user});
});


module.exports = router;