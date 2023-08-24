const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./route/user.route");
const { postBlogRouter } = require("./route/blog.route");
require("dotenv").config();

const app=express();
const cors=require("cors");
app.use(cors())
app.use(express.json());
app.use("/users",userRouter);
app.use("/",postBlogRouter)
app.listen(8080,async()=>{
    try {
        await connection;
        console.log(`connected to db ${process.env.port}`)
    } catch (error) {
        console.log({err:error.message})
    }
})