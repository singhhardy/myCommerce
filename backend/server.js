const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const PORT = process.env.PORT || 5000
const connectDB = require('./Config/db')
const { errorHandler } = require('./Middleware/errorMiddleware')

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended : false }))

app.use('/api/users', require('./Routes/usersRoute'))
app.use('/api/products', require('./Routes/productsRoutes'))
app.use('/api/cart', require('./Routes/cartRoutes'))

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to MyCommerce'})
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})