const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required:  true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: false
    },
    imageUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Products', productSchema)