import cors from 'cors'
import express from 'express'
import { ConsoleSignin } from "./signin/signin.js"
import { ConsoleRegister } from "./signin/signup.js"
import { SigninMiddleware } from './middleware/console.middleware.js'


const app = express()
app.use(cors())
app.use(express.json())


app.post('/consolelogin', async (req, res) => {
    await ConsoleSignin(req, res)
})

app.post('/consoleregister',SigninMiddleware, async (req, res) => {
    if (req.message) {
        await ConsoleRegister(req, res)
    }
})

export default app