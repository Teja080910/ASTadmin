import cors from 'cors'
import express from 'express'
import { ConsoleSignin } from "./signin/signin.js"
import { ConsoleRegister } from "./signin/signup.js"
import { AddRoute } from "./route-management/add-route.js"
import { AllRoutes } from "./route-management/get-allroutes.js"
import { ToggleRoutes } from "./route-management/modify-routes.js"
import { deleteRoute } from "./route-management/delete-route.js"
import { updateRouteName } from "./route-management/update-route-name.js"
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


app.get('/ast-console/allroutes', AllRoutes);
app.post('/ast-console/add-route', AddRoute);
app.post('/ast-console/routes/toggle', ToggleRoutes);
app.post('/ast-console/delete-route', deleteRoute);
app.post('/ast-console/update-route-name', updateRouteName);


export default app