import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import astconsole from '../src/ast-console/console.server.js';
import attendance from './attendance/attendance.server.js';
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

app.use(astconsole)