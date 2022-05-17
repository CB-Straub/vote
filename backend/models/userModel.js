const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Add a name please"]
    },
    email: {
        type: String,
        required: [true, "Add an email please"]
    },
    password: {
        type: String,
        required: [true, "Create a password"]
    },

}, 
{
     timestamps: true
})

module.exports = mongoose.model("User", userSchema)