const express = require('express');

const userControler = require('../Controller/userController') // Importing our userController

const router = express.Router(); // importing our export router method

// 
router.post("/signUp", userControler.createUser);


router.post("/login", userControler.postLogin);



module.exports = router;