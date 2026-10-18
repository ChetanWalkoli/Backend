const { ImageKit } = require("@imagekit/nodejs");

const imagekitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile(fileBuffer) {
    try {
        const result = await imagekitClient.files.upload({
            file: fileBuffer.toString("base64"),
            fileName: `music_${Date.now()}.mp3`,
            folder: "yt-completebackend/music"
        });

        return result;
    } catch (error) {
        console.error("ImageKit upload error:", error);
        throw new Error("Music upload failed");
    }
}

module.exports = { uploadFile };