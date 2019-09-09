const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./Routes/userRoutes')

const app = express();


const port = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use('/user', userRoute);


mongoose.connect('mongodb://localhost/users')
  .then(() => {
    console.log("I am connected");
  })
  .catch(err => {
    console.log(err)
  })
app.listen(port, () => {
    console.log(`Listening on port `, port)
})