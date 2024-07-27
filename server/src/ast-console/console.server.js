import cors from 'cors'
import express from 'express'
import { ConsoleMiddleware } from './middleware/console.middleware.js'
import { AddRoute } from "./route-management/add-route.js"
import { deleteRoute } from "./route-management/delete-route.js"
import { AllRoutes } from "./route-management/get-allroutes.js"
import { ToggleRoutes } from "./route-management/modify-routes.js"
import { updateRouteName } from "./route-management/update-route-name.js"
import { ConsoleSignin } from "./signin/signin.js"
import { ConsoleRegister } from "./signin/signup.js"
import { addNewAdmin } from './admin-management/addnewadmin.js'
import { getAdmins } from './admin-management/getalladmins.js'
import { deleteAdmin } from './admin-management/deleteadmin.js'


const app = express()
app.use(cors())
app.use(express.json())


app.post('/consolelogin', async (req, res) => {
    await ConsoleSignin(req, res)
})

app.post('/consoleregister', ConsoleMiddleware, async (req, res) => {
    await ConsoleRegister(req, res)
})

app.post("/ast-console/admins/addadmin",ConsoleMiddleware, addNewAdmin);

app.post("/ast-console/admins/getadmins",ConsoleMiddleware, getAdmins);

app.post("/ast-console/admins/deleteadmin",ConsoleMiddleware, deleteAdmin);

app.get('/ast-console/allroutes', AllRoutes);

app.post('/ast-console/add-route', ConsoleMiddleware, AddRoute);

app.post('/ast-console/routes/toggle', ConsoleMiddleware, ToggleRoutes);

app.post('/ast-console/delete-route', ConsoleMiddleware, deleteRoute);

app.post('/ast-console/update-route-name', ConsoleMiddleware, updateRouteName);


export default app