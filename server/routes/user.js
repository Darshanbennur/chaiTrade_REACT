const express = require('express')
const {getUserDetails, userRegister, userLogin, verifyCookie} =  require('../controllers/userController.js');

const router = express.Router();

router.get('/checkCookie', verifyCookie);

router.post('/registerUser', userRegister)
router.post('/login', userLogin)

router.get('/:id', getUserDetails);


module.exports = router