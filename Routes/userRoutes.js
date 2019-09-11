const express = require('express');

const userControler = require('../Controller/userController') // Importing our userController

const router = express.Router(); // importing our export router method

// 
router.post("/signUp", userControler.createUser);


router.post("/login", userControler.postLogin);


router.delete("/remove", userControler.authRole, userControler.deleteUser)



module.exports = router;