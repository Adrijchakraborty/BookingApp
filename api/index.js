import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRouter from "./routes/auth.js"
import hotelRouter from "./routes/hotels.js"
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();


//connection to database
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
}

app.get('/',(req,res)=>{
    res.send("Welcome");
})


//middleware

app.use(cookieParser())

app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/hotels',hotelRouter);


//error handler

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";

    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack:err.stack
    })
})

app.listen(8800,()=>{
    connect();
    console.log("Hello world");
})
