import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import astconsole from './ast-console/console.server.js';
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

const checkOrigin = (req, res, next) => {
  if (req.headers.origin === 'http://localhost:3001' || req.headers.origin === 'http://localhost:3000' || req.headers.origin === 'https://ast-admin.in') {
    next();
  } else {
    res.json({ error: 'Data dhobbedham ane kadha chusthunnav' });
  }
};

app.use(checkOrigin);
app.use(attendance)

app.use(hackathon)

app.use(astconsole)

connectToDB(() => {
  app.listen(8000, () => {
    console.log("server running at 8000");
  })
})