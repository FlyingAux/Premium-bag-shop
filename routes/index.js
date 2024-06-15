const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product');

router.get('/',function(req,res,next){
    let error = req.flash('error');
    res.render('index',{error});
})


router.get('/shop',isLoggedIn,async function(req,res,next){
    let products = await productModel.find()
    res.render('shop',{products});
})


router.get('/cart',isLoggedIn,function(req,res,next){
    res.render('cart');
})


module.exports = router;