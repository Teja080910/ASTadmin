import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { FileByName, RetriveFiles, UploadFiles } from '../bootcamp/materials/uploadmaterials.js';
import { initiateMulter } from '../multer/multer.js';
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.get('/hackathon', (req, res) => {
    res.json("hackathon server is running.....");
})

app.post('/uploadfile', initiateMulter(), async (req, res) => {
    if (req.files) {
        await UploadFiles(req?.files[0], res)
    }
});

app.post('/files', async (req, res) => {
    await RetriveFiles(res)
});

app.get('/file/:filename', async (req, res) => {
    const { filename } = req.params;
    await FileByName(filename, res)
});

export default app;