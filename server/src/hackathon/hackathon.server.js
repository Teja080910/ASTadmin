import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.get('/hackathon', (req, res) => {
    res.json("hackathon server is running.....");
})

export default app;