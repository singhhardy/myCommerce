const express = require('express')
const router = express.Router()
const { protect } = require('../Middleware/authMiddleware')
const { createCartList, getCartList, deleteCartProduct, updateProductQuantity } = require('../Controllers/cartController')

router.post('/', protect, createCartList).get('/', protect, getCartList).delete('/', protect, deleteCartProduct).put('/', updateProductQuantity)

module.exports = router