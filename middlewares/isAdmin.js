const jwt = require('jsonwebtoken');
const ownerModel = require('../models/owner');

module.exports = async function(req,res,next){
  try{
    let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
    let user = await ownerModel.findOne({email: decoded.email}).select("-password");
    req.user = user;
    if(user.role === 'admin'){
        next();
    }
    else{
        res.send('only Admins are authorized');
    }
  }
  catch(err){
    req.flash('error',"something went wrong.");
    res.redirect('/');
  }
};

