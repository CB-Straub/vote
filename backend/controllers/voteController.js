const asyncHandler = require('express-async-handler')

const Vote = require('../models/voteModel')
const User = require('../models/userModel')


//get all votes 
const getVotes =  asyncHandler(async (req, res) => {

    const votes = await Vote.find({ user: req.user.id})
    res.status(200).json({ votes })

})
//post request, creating a vote
const createVote = asyncHandler(async (req, res) => {
    
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please stick your finger in your butthole')
    }

    const vote = await Vote.create({
            text: req.body.text,
            user: req.user.id

          })

          res.status(200).json({ vote })

   

})
//put request,  update a vote
const updateVote = asyncHandler(async (req, res) => {
    const vote = await Vote.findById( req.params.id )

    if(!vote) {
        res.status(400)
        throw new Error('Vote not found')
    }
    const user = await User.findById(req.user.id)

    //check for the authenticated user
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    //verify logged user matches vote user
    if (vote.user.toString() !== user.id ) {
        res.status(401)
        throw new Error('Unauthorized User')
    }


    const updatedVote = await Vote.findByIdAndUpdate(req.params.id, req.body, { new: true} ) //new:true will create the new vote if it did not already exist

    res.status(200).json({ updatedVote } )

})
//delete a vote 
const deleteVote = asyncHandler(async (req, res) => {
    const vote = await Vote.findById( req.params.id )

    if(!vote) {
        res.status(400)
        throw new Error('Vote not found')
    }

     //check for the authenticated user
     if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    //verify logged user matches vote user
    if (vote.user.toString() !== req.user.id ) {
        res.status(401)
        throw new Error('Unauthorized User')
    }

    await Vote.deleteOne()

    res.status(200).json({ id: req.params.id })

})




module.exports = { getVotes, createVote, updateVote, deleteVote  }