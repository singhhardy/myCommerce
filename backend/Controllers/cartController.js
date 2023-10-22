const products = require('../Models/productsModal')
const User = require('../Models/userModal')
const Cart = require('../Models/cartModal')
const asyncHandler = require('express-async-handler')

// @desc Add Products to Cart
// @route /api/cart
// @access private


const createCartList = asyncHandler(async (req, res) => {
    const { userId, productId, quantity} = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = new Cart({
                userId,
                products: [{ product: productId, quantity }]
            });

            await cart.save();
            res.status(201).json({ message: "Product added to cart" });
            return;
        }

        // Check if the product already exists in the cart
        const existingProduct = cart.products.find((item) => item.product.equals(productId));

        if (existingProduct) {
            // If the product exists, update its quantity
            existingProduct.quantity += quantity;
        } else {
            // If the product doesn't exist, add it to the cart
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(201).json({ message: "Product quantity updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// @desc Get your products in Cart
// @route /api/cart
// @access private



const getCartList = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user.id)

    const cart = await Cart.findOne({ userId: user._id });

    if (cart) {
        res.status(200).json(cart.products); // Send the products as response
    } else {
        res.status(404).json({ message: "Your Cart is Empty" });
    }
})

const deletCartProduct = asyncHandler(async(req, res) => {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    if (user.cart && user.cart.products) {
        user.cart.products = user.cart.products.filter(product => product.product._id !== productId);
        await user.save();
        res.status(200).json({ message: "Product removed from the cart successfully.", updatedCart: user.cart });
    } else {
        res.status(404).json({ error: "Cart or product not found." });
    }
})


// @desc Update Quantity of products in Cart
// @route /api/cart
// @access private

const updateProductQuantity = asyncHandler(async(req, res) => {
    const {quantity} = req.body

    const user = await User.findById(req.user.id)

    const product = await products.findById(productId)

    const updatedProduct = await products.findByIdAndUpdate(quantity)

    res.status(201).send(updatedProduct)
    
})

module.exports = {
    createCartList,
    getCartList,
    deletCartProduct,
    updateProductQuantity
}