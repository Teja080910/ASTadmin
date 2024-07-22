import { ConsoleSignin } from "./signin/signin.js"
import { ConsoleRegister } from "./signin/signup.js"
import express from 'express'
import cors from 'cors'


const app = express()
app.use(cors())
app.use(express.json())


app.post('/consolelogin', async (req, res) => {
    await ConsoleSignin(req,res)
})

app.post('/consoleregister', async (req, res) => {
    await ConsoleRegister(req, res)
})

export default app