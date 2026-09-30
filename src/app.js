const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

/*
POST - create a note
GET - get all notes
PATCH - update a note
DELETE - delete a note
*/

app.post("/notes", async (req, res) => {

    const data = req.body;

    await noteModel.create({
        title: data.title,
        content: data.content
    });

    res.status(201).json({
        message: "Note created"
    });
});

app.get("/notes", async (req, res) => {

    const notes = await noteModel.find()
    
    res.status(200).json({
        message : "Notes Fetched Sucessfully",
        notes : notes
    })
});

app.delete("/notes/:id", async (req, res) => {
    const id = req.params.id

    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(200).json({
        message: "note deleted successfully.."
    })
});

app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id
    const description = req.body.description

    await noteModel.findOneAndUpdate({
        _id : id
    },
    {
        description : description
    })

    res.status(200).json({
        message : "Note Upadated Sucessfully.."
    })
})
module.exports = app;