// Importing the JWT module
const JWT = require('jsonwebtoken');

// Importing the userClass model
const User = require("../Services/userService");

// This is a middleware that takescare of the signUp /signUpUrl
exports.createUser = (req, res, next) => {
   const {name, email, phone, address, password} = req.body;
    const user = new User(name, email, parseInt(phone), address, password);
    user
        .save()
        .then((value)=> {
            res.status(200).send("Reistration is a success !!") ;
        })
        .catch((err)=> {
            res.status(200).send(err);
        })
}

// This is a middleware that takes care of the /login url
exports.postLogin = (req, res, next)=>{
    const {email, password} = req.body;
    const token = JWT.sign({email  : email}, 'myPrivateKey'); // creates a token which will be sent to the browser

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