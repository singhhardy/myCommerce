const products = require('../Models/productsModal')
const User = require('../Models/userModal')
const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

// @desc Create Products
// @route /api/products
// @access Private

const createProduct = asyncHandler(async(req, res) => {
    const {title, description, imageUrl, quantity, category, price} = req.body


    if(!title || !description || !imageUrl || !category || !price ){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const defaultQuantity = 1;

    const product = await products.create({
        title,
        description,
        category,
        quantity,
        price,
        imageUrl
    })

    res.status(201).json(product)

})

// @desc Delete a Products
// @route /api/products/:id
// @access Private

const deleteProduct = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user.id)

    if(!user){
        res.send(400)
        throw new Error('Not Authorized')
    }

    const productId = req.params.id

    const product = await products.findById(productId)

    if(!product){
        res.status(400)
        throw new Error('Product Not found')
    }

    await product.deleteOne() // Use deleteOne() instead of remove()

    res.status(200).json({success: true})
})

// @desc Update a Product
// @route /api/products/:id
// @access Private

const updateProduct = asyncHandler(async(req,res) => {
    // Get user by Id & jwt
    const user = await User.findById(req.user.id)

    const productId = req.params.id

    if(!user){
        res.status(200)
        throw new Error('Not Authorized')
    }

    const product = await products.findById(productId)

    if(!product){
        res.status(400)
        throw new Error('Product not found')
    }

    const updatedProduct = await products.findByIdAndUpdate(productId, req.body, {new: true})

    res.status(201).send(updatedProduct)
})


// @desc Get all Products
// @route /api/products
// @access Public

const getProducts = asyncHandler(async(req,res) => {
    
    const productsList = await products.find()

    if(!productsList){
        throw new Error('No products in list Yet')
    }
    
    res.status(200).send(productsList)
}) 

// @desc Single Products
// @route /api/products/:id
// @access Public

const getProduct = asyncHandler(async(req, res) => {
    const productId = req.params.id;

    if(!mongoose.isValidObjectId(productId)){
        return res.status(400).json({ message: 'Invalid Product Id'})
    }

    const singleProduct = await products.findById(productId)

    if(!singleProduct){
        res.status(400)
        throw new Error('Product Not found')
    }

    res.status(200).json(singleProduct)
})

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    getProduct
}