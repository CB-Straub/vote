const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Add a text value please']    
    }
}, {
    timestamps: true  //creates a timestamp for created at and updtaed at timestamps for each vote
})

module.exports = mongoose.model('Vote', voteSchema )

