const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authroutes = require('./Routes/auth.routes.js');
const musicroutes = require('./Routes/music.routes.js');

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authroutes);
app.use('/music', musicroutes);

module.exports = app;