require("dotenv").config()
const connectDB = require("./connection/connectDB")
const cors = require("cors");
const express = require("express")
const authMiddleWare = require("./middleware/auth");
const authRouter = require('./routes/auth')
const productsRouter = require("./routes/products");
const listRouter = require("./routes/list")
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));


app.get("/", (req, res) => {
    res.json({ "message": "Build Succeded" })
})

app.use("/api/auth", authRouter);
app.use('/api/user', authMiddleWare, listRouter);
app.use("/api/products", authMiddleWare, productsRouter)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(5000, () => {
            console.log("Server started Successfully");
        })
    }
    catch (error) {
        console.log("Database connection failed");
        console.log(error.message);
    }
}

start();