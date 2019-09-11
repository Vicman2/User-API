// importing mongoose
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : { type: String, required: true}, 
    email: {type: String, required : true}, 
    phone: {type: Number, required: true}, 
    address: {type: String, required: true}, 
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true}
})

module.exports = mongoose.model('User', UserSchema);


