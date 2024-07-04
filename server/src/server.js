import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import attendance from './attendance/attendance.server.js';
import { connectToDB } from "./db.js";
import hackathon from './hackathon/hackathon.server.js';

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json("server is running successfully!");
})





app.use(attendance)

app.use(hackathon)

connectToDB(() => {
    app.listen(8000, () => {
        console.log("server running at 8000");
    })
})