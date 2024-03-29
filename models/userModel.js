const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required : [true, "Please enter first name"],
        },
        lastName: {
            type: String,
            required : [true, "Please enter last name"],
        },
        email: {
            type: String,
            required : [true, "Please enter email"],
        },
        password: {
            type: String,
            required : [true, "Please enter password"],
        },
        category: {
            type: String,
            required : [true, "Please enter user category"],
        },
    });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel ;