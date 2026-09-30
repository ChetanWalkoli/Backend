const app = require("./src/app"); // start the server
const connectDb = require("./src/db/db")

connectDb()

app.listen(3000, () => {
    console.log("server is running on port 3000")
})