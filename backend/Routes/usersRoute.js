const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../Controllers/userController')

router.post('/Register', registerUser)

router.post('/Login', loginUser)

module.exports = router