const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product');
const userModel = require('../models/user');

router.get('/',function(req,res,next){
    let error = req.flash('error');
    res.render('index',{error});
})


router.get('/shop',isLoggedIn,async function(req,res,next){
    let products = await productModel.find()
    res.render('shop',{products});
})


// router.get('/cart/:productid',async function(req,res,next){
//     let email = req.body;
//     let user = await userModel.findOne({email: email});
//     console.log(user)
// })

router.get('/cart',isLoggedIn,async function(req,res,next){
    res.render('cart');
})


module.exports = router;