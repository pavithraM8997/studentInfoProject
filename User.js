const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    Studentname: String,
    age:String,
    email:String,
    cource:String,
    phoneno:String,
    address:String


       
    },
);


const User = mongoose.model('User', userSchema);

module.exports = User;  
