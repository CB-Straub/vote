const asyncHandler = require('express-async-handler')

const Vote = require('../models/voteModel')


//get all votes 
const getVotes =  asyncHandler(async (req, res) => {

    const votes = await Vote.find()
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
    await Vote.deleteOne()

    res.status(200).json({ id: req.params.id })

})




module.exports = { getVotes, createVote, updateVote, deleteVote  }