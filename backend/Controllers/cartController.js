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

// Remove Product from Cart
// @desc Delete product from cart
// @route DELETE /api/cart
// @access private

// Import necessary dependencies, models, and asyncHandler if not already done

const deleteCartProduct = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Assuming that Cart model has an array called "products" with subdocuments
        const productIndex = cart.products.findIndex((product) => product.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(400).json({ message: 'Product Not found' });
        }

        // Remove the product from the products array
        cart.products.splice(productIndex, 1);

        await cart.save(); // Save the cart after removing the product

        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// @desc Update Quantity of products in Cart
// @route /api/cart
// @access private

const updateProductQuantity = asyncHandler(async (req, res) => {
    const { userId, updatedCart } = req.body;

    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Update the cart's products with the updatedCart
      cart.products = updatedCart;
  
      await cart.save();
      return res.status(200).json({ message: "Product quantities updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
});
  
module.exports = {
    createCartList,
    getCartList,
    deleteCartProduct,
    updateProductQuantity
}