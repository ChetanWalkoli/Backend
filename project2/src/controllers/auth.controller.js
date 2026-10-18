const userModel = require('../models/user.model');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    try {
        const { username, email, password, role = 'user' } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'Username, email, and password are required'
            });
        }

        const isUserExists = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserExists) {
            return res.status(409).json({
                message: 'User already exists'
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new userModel({
            username,
            email,
            password: hash,
            role
        });

        await user.save();

        const token = jsonwebtoken.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET
        );

        res.cookie('token', token, {
            httpOnly: false,
            sameSite: 'lax'
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error('Registration error:', error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const identifier = username || email;

        if (!identifier || !password) {
            return res.status(400).json({
                message: 'Username/email and password are required'
            });
        }

        const user = await userModel.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }

        const token = jsonwebtoken.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET
        );

        res.cookie('token', token, {
            httpOnly: false,
            sameSite: 'lax'
        });

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

async function logoutUser(req, res) {
    res.clearCookie('token');
    return res.status(200).json({
        message: 'Logout successful'
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};