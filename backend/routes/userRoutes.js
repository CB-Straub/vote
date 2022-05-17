
const express = require('express')
const router = express.Router()

const { registerUser, loginUser, getUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')


//adding a new user.....public route 
router.post('/', registerUser )


//authenticate a user 
router.post('/login', loginUser )

//get one users data
router.get('/user', protect, getUser )



module.exports = router