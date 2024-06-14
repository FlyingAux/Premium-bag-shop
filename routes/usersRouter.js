const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const generateToken = require('../utils/generateToken');
const {registerUser, loginUser, logout} = require('../controllers/authController');

router.get('/',function(req,res){
    res.send('welcome u');
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logout);


module.exports = router;