const usermodel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isUserExist = await usermodel.findOne({ email });
    if (isUserExist) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const User = await usermodel.create({ username, email, password });

    const token = jwt.sign(
        { id: User._id },
        process.env.JWT_SECRET
    );

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: User
    })
}

module.exports = { registerUser }
