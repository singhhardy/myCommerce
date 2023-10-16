const express = require('express')
const router = express.Router()
const { protect } = require('../Middleware/authMiddleware')
const { createCartList, getCartList } = require('../Controllers/cartController')

router.post('/', protect, createCartList).get('/', protect, getCartList)

module.exports = router