const asyncHandler = require('express-async-handler')
//get all votes 
const getVotes =  asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Votes'})

})
//post request, creating a vote
const createVote = asyncHandler(async (req, res) => {
    
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please stick your finger in your butthole')
    }
    res.status(200).json({ message: 'Create Vote'})

})
//put request,  update a vote
const updateVote = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update vote ${req.params.id}`})

})
//delete a vote 
const deleteVote = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete vote ${req.params.id}`})

})




module.exports = { getVotes, createVote, updateVote, deleteVote  }