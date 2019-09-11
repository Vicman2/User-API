// Importing the JWT module
const JWT = require('jsonwebtoken');

// Importing the userClass model
const User = require("../Services/userService");
const userModel = require("../Model/userModel")

// This is a middleware that takescare of the signUp /signUpUrl

let isAdmin = false
exports.authRole = (req, res, next) => {
    const {token} = req.headers;
    const valid = JWT.verify(token, 'mySecretKey');
    if(valid){
        userModel.findOne({email : valid.email})
            .then(value => {
                isAdmin = value.isAdmin;
            })
            .catch(err => {
                console.log(err);
            })
    }else{
        res.status(200).send({success: false, message: "Access Denied!!!"})
    }
    next();   
}

exports.createUser = (req, res, next) => {
   const {name, email, phone, address, password} = req.body;
    const user = new User(name, email, parseInt(phone), address, password);
    user
        .save()
        .then((value)=> {
            res.status(200).send("Reistration is a success !!!") ;
        })
        .catch((err)=> {
            res.status(200).send(err);
        })
}

// This is a middleware that takes care of the /login url
exports.postLogin = (req, res, next)=>{
    const {email, password} = req.body;
    const token = JWT.sign({email  : email}, 'mySecretKey'); // creates a token which will be sent to the browser

    User.logIn(email, password)
        .then(value => {
            if(value == true){
                res.status(200).send({token : token})
            }else{
                res.send("You are logged out")
            }
        }).catch(err => {
            console.log(err)
       })
}


exports.deleteUser = (req, res, next)=>{
    const {email} = req.body;
    if(isAdmin){
        userModel.findOneAndDelete({email: email})
            .then(value => {
                if(value){
                    res.status(200).send({success: true, message: "Delete User", deleteUser: value})
                }else{
                    res.status(200).send({success: false, message: "User do not exist"})
                }
            })
    }else{
        res.status(200).send({success: false, message: "Access Denied!!!"})
    } 
}