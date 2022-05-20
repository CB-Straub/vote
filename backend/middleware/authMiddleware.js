const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header, bearer is the 0 index and the token is 1 
      token = req.headers.authorization.split(' ')[1]  

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }







// const jwt = require('jsonwebtoken')
// const asyncHandler = require('express-async-handler')
// const User = require('../models/userModel')

// const private = asyncHandler( async ( req, res, next  ) => {
  
//     let token

//     if (
//         req.headers.authorization && req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             token = req.headers.authorization.split('')[1]  //gets the token from the token index of the header,  bearer = 0 token = 1
//             const decoded = jwt.verify(token, process.env.JWT_SECRET) 
//             req.user = await User.findById(decoded.id).select('-password')//gets user from the token/id, -password wil not include the hashed password in the payload

//             next() //calls the next piece of middleware

//         }catch(error){
//             console.log(error)
//             res.status(401) //401 = not authorized
//             throw new Error('Authorization failed')

//         }
//     }
//     if(!token) {
//         res.status(401)
//         throw new Error('Auth Failed, no token found')
//     }

// })
    

// module.exports = {private}