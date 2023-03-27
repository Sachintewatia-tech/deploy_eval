const express = require("express");
const { connection } = require("./db");
const { auth } = require("./models/auth.middleware");
const { postRouter } = require("./routes/post.route");
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();
const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("HOME PAGE");
})

app.use("/users",userRouter);
app.use(auth);
app.use("/posts",postRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log("error in connecting to db");
        console.log(error);
    }
    console.log(`running server on ${process.env.port} port`);
})