const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser } = require('../Controllers/userController')
const { protect } = require('../Middleware/authMiddleware')

router.post('/Register', registerUser)

router.post('/Login', loginUser)

router.get('/login/:id',  getUser)

module.exports = router