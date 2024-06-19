import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { AbsentStudent, AttendStudent } from '../bootcamp/attendance/attendance.js';
import { FileByName, RetriveFiles, UploadFiles } from '../bootcamp/materials/uploadmaterials.js';
import { Students } from '../bootcamp/studentdata/students.js';
import { UploadStudents } from '../bootcamp/studentdata/uploadstudentdata.js';
import { DeleteTasks } from '../bootcamp/taskmanger/deletetask.js';
import { EditTasks } from '../bootcamp/taskmanger/edittask.js';
import { InsertTask } from '../bootcamp/taskmanger/insertask.js';
import { HideTasks, ShowTasks } from '../bootcamp/taskmanger/showtask.js';
import { Tasks } from '../bootcamp/taskmanger/tasks.js';
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

app.post('/inserttask', async (req, res) => {
    await InsertTask(req.body.day, req.body.task, req.body.description,req.body.marks, res)
})

app.post('/deletetask', async (req, res) => {
    await DeleteTasks(req.body.selectday, req.body.selecttask, res)
})

app.post('/edittask', async (req, res) => {
    await EditTasks(req.body.selectday, req.body.selecttask, req.body.selectdesc,  req.body.index, res)
})

app.post('/showtask', async (req, res) => {
    await ShowTasks(req.body.selectday, req.body.index, res)
})

app.post('/hidetask', async (req, res) => {
    await HideTasks(req.body.selectday, req.body.index, res)
})

app.post('/tasks', async (req, res) => {
    await Tasks(res)
})

app.post('/bootcampstudents',async(req,res)=>{
    await Students(res)
})

app.post('/attendstudent/:regd',async(req,res)=>{
    await AttendStudent(req.params.regd,res)
})

app.post('/absentstudent/:regd',async(req,res)=>{
    await AbsentStudent(req.params.regd,res)
})

app.post('/studentxlsx',initiateMulter(),async(req,res)=>{
    await UploadStudents(req?.files[0],res)
})

export default app;