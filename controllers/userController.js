const userModel = require('../models/userModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const newUserController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({ success: false, message: `User with email ${req.body.email} already existes !` })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ success: true, message: 'User data added successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Something went wrong. Error - ${error}` })
    }
}

// login callback
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        console.log(user)
        if (!user) {
            return res
                .status(200)
                .send({ message: "user not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .send({ message: "Invlid Email or Password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        console.log(`Category is ${user.category}`)
        res.status(200).send({ message: "Login Success", success: true, token, data: user });
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: `Something went wrong ${error}` })
    }
}

module.exports = { newUserController, loginController }