const express = require('express');
const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model.js");

const router = express.Router();

router.post('/create', async(req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user= await usermodel.findById({
            _id: decoded.id
        })
        console.log("user", user)

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }


    res.send("post created successfully");
})

module.exports = router;