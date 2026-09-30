const mongoose = require("mongoose");

async function connectDb() {

        await mongoose.connect("mongodb+srv://chetanwalkoli45_db_user:DPOyb97xWNslbOoy@yt-backend.n2pyfrm.mongodb.net/")

        console.log("Connected to Db")
}

module.exports = connectDb

/*
chetanwalkoli45_db_user

DPOyb97xWNslbOoy

mongodb+srv://chetanwalkoli45_db_user:DPOyb97xWNslbOoy@yt-backend.n2pyfrm.mongodb.net/
*/