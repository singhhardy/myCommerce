const express = require('express')
const router = express.Router()
const { protect } = require('../Middleware/authMiddleware')
const { createCartList, getCartList, deletCartProduct, updateProductQuantity } = require('../Controllers/cartController')

router.post('/', protect, createCartList).get('/', protect, getCartList).delete('/', protect, deletCartProduct).put('/', updateProductQuantity)

module.exports = router