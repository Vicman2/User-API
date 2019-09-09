const express = require('express');

const userControler = require('../Controller/userController')

const router = express.Router();


router.post("/signUp", userControler.createUser);
router.post("/login", userControler.postLogin);



module.exports = router;