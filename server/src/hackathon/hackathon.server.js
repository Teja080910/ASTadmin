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
let tasks=[]
app.post('/tasks', (req, res) => {
    try {
        const { day, task, description } = req.body;
        if (!day || !task || !description) {
            return res.status(400).json({ message: 'Day, task, and description are required' });
        }
        const newTask = { day, task, description };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error adding new task:', error);
        res.status(500).json({ message: 'Internal server error', error: error.toString() });
    }
});
app.get('/tasks', (req, res) => {
    res.json(tasks);
});




// app.get('/tasks', (req, res) => {
//     const tasks = [
//         { "day":"Day 1","title": "Task 1", "description": "solve task1" },
//         { "day":"Day 2","title": "Task 2", "description": "Description for task 2" },
//         { "day":"Day 3","title": "Task 2", "description": "Description for task 3" },
//         { "day":"Day 4","title": "Task 2", "description": "Description for task 4" },
//     ];
//     res.json(tasks);
// });
export default app;