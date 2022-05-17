  const jwt = require('jsonwebtoken')
  const bcrypt = require('bcryptjs')
  const asyncHandler = require('express-async-handler')
  const User = require('../models/userModel')



//sign up a new user
const registerUser =  asyncHandler( async ( req, res ) => {

    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Add required fields please')

     
    }
    //check if the user already  exists
    const userExists = await User.findOne({ email })
    if(userExists) {
        res.status(400)
        throw new Error ('User already exists')
    }
    //hash password
    const salt = await bcrypt.genSalt(10) //10 is default
    const hashedPassword = await bcrypt.hash( password, salt )

    //create a user
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword
    })
    if(user) { 
        res.status(201).json({ 
            _id: user.id, 
            name: user.name, 
            email: user.email, 
            token: generateToken(user._id)
     })
    } else {
        res.status(400)
        throw new Error('User data is invalid')

     }
   

    // res.json({message: 'Register User'})
})

//authenticate a user 
const loginUser = asyncHandler( async ( req, res ) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id, 
            name: user.name, 
            email: user.email,
            token: generateToken(user._id)

        })
    }else {
        res.status(400)
        throw new Error ('Invalid Credentials')
    }
        
    

    // res.json({ message: 'Login User '})testing only 
})

//get user data,  private route with custom middleware
const getUser = asyncHandler( async  ( req, res ) => {

    const { _id, name, email } = await User.findById( req.user.id )
    res.status(200).json({
        id: _id,
        name,
        email
    })

    // res.json({ message: 'Get User Data'})testing only

})


//generate jwt token function,  using user Id as payload for generating a token byb each user specific id. 

const generateToken = (id) => {
    return jwt.sign( { id },  process.env.JWT_SECRET, {expiresIn: '30d'} )   
}

module.exports =  { 
    registerUser, 
    loginUser,
     getUser
 }