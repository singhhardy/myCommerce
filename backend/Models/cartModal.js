const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming you have a User model
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' //Assuming You have a product Model
      },
      quantity: {
        type: Number
      }
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
