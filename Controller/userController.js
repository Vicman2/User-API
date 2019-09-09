const User = require("../Model/userClass");

exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const password = req.body.password;

    const user = new User(name, email, phone, address, password);
    user
        .save()
        .then((value)=> {
            res.status(400).send("Rgistration is a success !!") ;
        })
        .catch((err)=> {
            res.status(404).send(err);
        })
}

exports.postLogin = (req, res, next)=>{
    const name = req.body.name;
    const email = req.body.pass;
    const user = new User(name, email);

    user.logIn(user)
        .then(value => {
            if(value == true){
                res.send("You are logged In")
            }else{
                res.send(" You are logged out")
            }
        }).catch(err => {
            console.log(err)
        })
}