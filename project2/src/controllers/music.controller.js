const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const userModel = require("../models/user.model");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {
    try {
        const { title } = req.body;
        const file = req.file;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!file) {
            return res.status(400).json({ message: "Music file is required" });
        }

        const result = await uploadFile(file.buffer);

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user.id
        });

        return res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        });
    } catch (error) {
        console.error("Create music error:", error);
        return res.status(500).json({
            message: "Failed to create music",
            error: error.message
        });
    }
}

async function createAlbum(req, res) {
    try {
        const { title, musicIds } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musicIds || []
        });

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        });
    } catch (error) {
        console.error("Create album error:", error);
        return res.status(500).json({
            message: "Failed to create album",
            error: error.message
        });
    }
}

async function getAllMusic(req, res) {
    try {
        const music = await musicModel.find().sort({ _id: -1 }).populate("artist", "username email");
        return res.status(200).json({
            message: "All music fetched successfully",
            musics: music
        });
    } catch (error) {
        console.error("Get all music error:", error);
        return res.status(500).json({
            message: "Failed to fetch music",
            error: error.message
        });
    }
}

async function getAllAlbums(req, res) {
    const albums = await albumModel.find().select("title artist").populate("artist", "username email");
    
    res.status(200).json({
        message: "All albums fetched successfully",
        albums: albums
    })
}

async function getAlbumById(req, res) {

    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate("musics").populate("artist", "username email");

    res.status(200).json({
        message: "Album fetched successfully",
        album: album
    })
}

module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbums, getAlbumById };
