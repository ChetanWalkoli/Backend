const express = require("express");
const authRoutes = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post.route.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/post', postRoutes);

module.exports = app;