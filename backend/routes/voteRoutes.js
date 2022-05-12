const express = require('express')
const router = express.Router()
const { getVotes, createVote, updateVote, deleteVote,  } = require('../controllers/voteController')


router.route('/').get(getVotes).post(createVote)

router.route('/:id').put(updateVote).delete(deleteVote)




module.exports = router