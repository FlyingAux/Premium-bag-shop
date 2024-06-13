const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');
const config = require("config");

mongoose.connect(`${config.get("MONGODB_URI")}/premiumBag`)
.then(function(){
    dbgr('connected');
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;