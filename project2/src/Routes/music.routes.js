const express = require("express");
const router = express.Router();
const musiccontroller = require("../controllers/music.controller");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });

// Protected Artist Routes
router.post("/upload", upload.single("file"), authMiddleware.authArtist, musiccontroller.createMusic);
router.post("/album", authMiddleware.authArtist, musiccontroller.createAlbum);

// Public/Listener Streaming & Browsing Routes
router.get("/", musiccontroller.getAllMusic);
router.get("/albums", musiccontroller.getAllAlbums);
router.get("/album/:albumId", musiccontroller.getAlbumById);

module.exports = router;