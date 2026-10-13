const express = require('express');
const cookieParser = require('cookie-parser');
const authroutes = require('./Routes/auth.routes.js');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authroutes);

module.exports = app;