const express = require("express");
const multer = require("multer");
const uploadfile = require("./services/storage.service");
const postModel = require("./models/post.model");
const app = express();
app.use (express.json());

const upload = multer({storage: multer.memoryStorage()})

app.post("/create-post", upload.single("image"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const result = await uploadfile(req.file.buffer);
    console.log(result);

    const post = await postModel.create({
        Image: result.url,
        caption: req.body.caption
    })

    return res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post
    })
})

app.get("/get-posts", async (req, res) => {
    const posts = await postModel.find();

    return res.status(200).json({
        success: true,
        message: "Posts fetched successfully",
        data: posts
    })
});

module.exports = app;