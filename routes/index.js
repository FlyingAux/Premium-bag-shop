const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/',function(req,res,next){
    let error = req.flash('error');
    res.render('index',{error});
})


router.get('/shop',isLoggedIn,function(req,res,next){
    res.render('shop');
})
module.exports = router;