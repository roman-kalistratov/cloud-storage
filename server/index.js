import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload"
import path from 'path';
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import fileRouter from "./routes/file.routes.js";
import { fileURLToPath } from 'url';
import filePathMiddleware from'./middleware/filepath.middleware.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();


//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('static'))
app.use(fileUpload({}))
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))

app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

//mongoDB connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

const PORT = process.env.serverPort || 8800
app.listen(PORT, () => {
    connect();
    console.log(`Connected to Server, Port: ${PORT}`);
});
