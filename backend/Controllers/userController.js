const asyncHandler = require('express-async-handler')
const User = require('../Models/userModal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc Register a new user
// @route /api/users
// @access Public

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    // Check fields
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        res.send('User Already Exists')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
    
})

// @desc Register a new user
// @route /api/users
// @access Public

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(401)
        throw new Error('Invalid Credentials')
    }

})

// @desc Get User Data
// @route /api/users
// @access Public

const getUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    
    res.status(200).send(user)
})

// Generate Token

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}