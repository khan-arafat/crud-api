const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please add a username"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: [true, "Email address must be unique"]
    },
    password: {
        type: String,
        required: [true, "Please add a user password"],
        minlength: [6, "Password must be six characters"]
    }
},{
    timeStamps: true
});

module.exports = mongoose.model("Users", userSchema);