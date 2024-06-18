const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const productModel = require('../models/product');
const ownerModel = require('../models/owner');
const jwt = require('jsonwebtoken');


router.post('/create',upload.single('image'),async function(req,res){

    try{
        let {image, name, price, discount, bgcolor, panelcolor, textcolor} = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });

        let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user = await ownerModel.findOne({email: decoded.email}).select("-password");

        user.products.push(product._id)

        await user.save();
        
        req.flash('success','Product created successfully');
        res.redirect('/owners/admin');
    }
    catch(err){
        res.send(err.message);
    }
});





module.exports = router;