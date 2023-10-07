const products = require('../Models/productsModal')
const User = require('../Models/userModal')
const Cart = require('../Models/cartModal')
const asyncHandler = require('express-async-handler')

// @desc Add Products to Cart
// @route /api/products/:id
// @access Public


const createCartList = asyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId })

    if (!cart) {
        cart = new Cart({ userId, products: [] })
    }

    const productIndex = cart.products.findIndex(product => product.productId === productId);

    if (productIndex !== -1) {
        // If the product already exists in the cart, update the quantity
        cart.products[productIndex].quantity += quantity;
    } else {
        // If the product doesn't exist, add it to the cart
        cart.products.push({ productId, quantity })
    }

    await cart.save();

    res.status(201).json({ message: "Product added to cart" })
});

const getCartList = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user.id)

    const cart = await Cart.findOne({ userId: user._id });

    if (cart) {
        console.log(cart.products);
        res.status(200).json(cart.products); // Send the products as response
    } else {
        res.status(404).json({ message: "Your Cart is Empty" });
    }
})

module.exports = {
    createCartList,
    getCartList
}