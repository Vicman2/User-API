// Importing the JWT module
const JWT = require('jsonwebtoken');

// Importing the userClass model
const User = require("../Model/userClass");

// This is a middleware that takescare of the signUp /signUpUrl
exports.createUser = (req, res, next) => {
   const {name, email, phone, address, password} = req.body;
    const user = new User(name, email, parseInt(phone), address, password);
    user
        .save()
        .then((value)=> {
            console.log(value)
            res.status(400).send("Rgistration is a success !!") ;
        })
        .catch((err)=> {
            res.status(404).send(err);
        })
}

// This is a middleware that takes care of the /login url
exports.postLogin = (req, res, next)=>{
    const token = JWT.sign({isLoggedIn : true}, 'myPrivateKey'); // creates a token which will be sent to the browser
    const email = req.body.email;
    const  password = req.body.password;

    User.logIn(email, password)
        .then(value => {
            if(value == true){
                res.send("You are logged In with this json web token " + token)
            }else{
                res.send("You are logged out")
            }
        }).catch(err => {
            console.log(err)
       })
}