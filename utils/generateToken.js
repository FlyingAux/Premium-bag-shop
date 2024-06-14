const jwt = require('jsonwebtoken');
const generateToken = function(newUser){
    return jwt.sign({email: newUser.email, id: newUser._id},process.env.JWT_KEY);
}
module.exports = generateToken;