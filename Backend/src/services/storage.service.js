// const ImageKit = require("@imagekit/nodejs");

// const imagekit = new ImageKit({
//     privateKey: "process.env.private_DmsJSfiFLqeZ6f7wGh9PbRALsmI="
// });

// async function uploadfile(buffer) {
//     const result = await imagekit.files.upload({
//         file: buffer,
//         fileName: "image.jpg"
//     });

//     return result;
// }

// module.exports = uploadfile;

const ImageKit = require("@imagekit/nodejs");

console.log(
    "ImageKit key loaded:",
    !!process.env.IMAGEKIT_PRIVATE_KEY
);

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadfile(buffer) {
    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    });

    return result;
}

module.exports = uploadfile;