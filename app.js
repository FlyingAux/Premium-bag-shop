const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');
const productModel = require('./models/product');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(cookieParser());

app.get('/',function(req,res,next){
    res.render('index');
})

app.listen(3000);