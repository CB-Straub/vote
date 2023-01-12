const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Add a text value please']    
    }, 
    createdAt:{
        type: Date,
        required: false,
    },
    // imageUrl: {
    //     type: String,
    //     required: true
    // },
    // description: {
    //     type: String,
    //     required: true
    // }
}, {
    // timestamps: true  //creates a timestamp for created at and updtaed at timestamps for each vote
})

module.exports = mongoose.model('Vote', voteSchema )

