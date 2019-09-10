// Our imported Modules==============//
const express = require('express'); 
const mongoose = require('mongoose');
//====================================//


// The user routeHandler
const userRoute = require('./Routes/userRoutes')


const app = express();

// setting our port
const port = process.env.PORT || 7000;
//=====================


//Our body-parser middle ware
app.use(express.json());
app.use(express.urlencoded({extended: false}))



// if the initial url is /user, then user the user route handler
app.use('/user', userRoute);



// connection to our mongo db
mongoose.connect('mongodb://localhost/users')
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(err => {
    console.log(err)
  })
app.listen(port, () => {
    console.log(`Listening on port `, port)
})


app.on("error", () => {
  console.log(`Error occured on port ${port}`);
})


// =============================================================//
// use this with a post request in the url /user/signUp
// {
//   "email": "offordilevictor@gmail.com",
//   "password": "342cecm%#2535"
// }
// ===========================================================

// =============================================================//
// use this with a post request in the url /user/signUp
// {
//   "name": "Chimaobi Victor"
//   "email": "offordilevictor@gmail.com",
//   "phone": "08102764439"
//   "address": "55 achara layout Enugu"
//   "password": "342cecm%#2535"
// }
// ===========================================================