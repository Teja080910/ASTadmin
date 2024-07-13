import cors from 'cors';
import express from 'express';
import { connectToDB } from '../db.js';
import { ConsoleSignin } from './signin/signin.js';
import { ConsoleRegister } from './signin/signup.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

let database = null;

app.post('/consolelogin', async (req, res) => {
    await ConsoleSignin(req)
        .then((result) => {
            database = result
        })
        .catch((e) => console.log(e))
})

app.post('/consoleregister', async (req, res) => {
    await ConsoleRegister(req, res)
})

connectToDB({
    database: database,
    datacb: () => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log("user db connected");
        });
    },
    cb: () => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log("Admin db connected");
        });
    },
});

export default app;
