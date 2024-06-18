const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const userModel = require('./models/user');
const productModel = require('./models/product');
const ownerModel = require('./models/owner');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const router = require('./routes/index');
const expressSession = require('express-session');
const flash = require('connect-flash');


require('dotenv').config();

console.log('Environment:', process.env.NODE_ENV);

const db = require('./config/mongoose-connection');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash());


app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/', router);

app.listen(3000);