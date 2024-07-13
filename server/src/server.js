import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { ConsoleSignin } from './ast-console/signin/signin.js';
import { ConsoleRegister } from './ast-console/signin/signup.js';
import attendance from './attendance/attendance.server.js';
import { connectToDB } from './db.js';
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

let database;

app.post('/consolelogin', async (req, res) => {
    await ConsoleSignin(req)
        .then(async (result) => {
            if (result?.Club && result?.Event) {
                database = result?.Club + result?.Event
                res.send({ message: 'login successfully', data: result })
            }
        })
        .catch((e) => console.log(e))
})

app.post('/consoleregister', async (req, res) => {
    await ConsoleRegister(req, res)
})

connectToDB({
    database: database,
    cb: () => {
        app.listen(8000, () => {
            console.log(`Server is running on port ${8000}`);
        });
    },
});