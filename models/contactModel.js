const mongoose = require('mongoose');

const SchemaType = mongoose.Schema;

const contactSchema = new SchemaType({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    name: {
        type : String,
        required: [true, "Please add contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add email address"],
        unique: [true, "Email already exist"]
    },
    phone: {
        type: Number,
        required: [true, "Please add phone number"]
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Contact", contactSchema);