const express = require('express')
const router = express.Router()
const { protect } = require('../Middleware/authMiddleware')
const {createProduct, getProducts, updateProduct, deleteProduct, getProduct} = require('../Controllers/productsController')

router.post('/', createProduct).get('/',getProducts)
router.route('/:id').put( protect, updateProduct).delete( protect, deleteProduct).get(getProduct)

module.exports = router