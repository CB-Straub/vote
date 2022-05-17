const express = require('express')
const router = express.Router()
const { getVotes, createVote, updateVote, deleteVote,  } = require('../controllers/voteController')

const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getVotes).post(protect, createVote)

router.route('/:id').put(protect, updateVote).delete(protect, deleteVote)




module.exports = router