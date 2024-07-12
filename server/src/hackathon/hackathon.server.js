import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { AdminLogin } from '../bootcamp/admin/adminlogin.js';
import { AdminRegister } from '../bootcamp/admin/adminregister.js';
import { AbsentStudent, AttendStudent } from '../bootcamp/attendance/attendance.js';
import { DeleteMaterial, DeleteMaterials } from '../bootcamp/materials/deletematerials.js';
import { EditMaterial } from '../bootcamp/materials/editmaterial.js';
import { Materials } from '../bootcamp/materials/materials.js';
import { FileByName, UploadFiles } from '../bootcamp/materials/uploadmaterials.js';
import { ActivityMarks, InternalMarks } from '../bootcamp/others/others.js';
import { GivenMarks } from '../bootcamp/scoremanager/score.js';
import { DeleteAll, Students } from '../bootcamp/studentdata/students.js';
import { DeleteStudent, UpdateStudent } from '../bootcamp/studentdata/updatestudent.js';
import { UploadStudents } from '../bootcamp/studentdata/uploadstudentdata.js';
import { DeleteTasks } from '../bootcamp/taskmanger/deletetask.js';
import { EditTasks } from '../bootcamp/taskmanger/edittask.js';
import { InsertTask } from '../bootcamp/taskmanger/insertask.js';
import { HideDay, HideTasks, ShowDay, ShowTasks } from '../bootcamp/taskmanger/showtask.js';
import { Tasks } from '../bootcamp/taskmanger/tasks.js';
import { initiateMulter } from '../multer/multer.js';
import { DeleteRound, InsertRound, RoundMarks } from './hacktasks/addround.js';
import { DeletePS } from './problemstatements/deleteps.js';
import { EditPS } from './problemstatements/editps.js';
import { InsertPS } from './problemstatements/insertps.js';
import { PSS } from './problemstatements/pss.js';
import { AllTeamCodes } from './teamcodes/allteamcodes.js';
import { AddTeamCodes, DeleteTeam } from './teamcodes/teamcodes.js';
import { StartHackathon } from './start&stop/hackathonstart.js';
import { EndHackathon } from './start&stop/hackathonend.js';
import { AllTeamRegistrers } from './teamregistrers/allregistrers.js';
import { CreateRegistrer, DeleteRegistrer, UpdateRegistrerStatus } from './teamregistrers/registrersactions.js';
import { HackActivityMarks, HackInternalMarks } from './others/others.js';
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.get('/hackathon', (req, res) => {
    res.json("hackathon server is running.....");
})

app.post('/bootcampadminlogin', async (req, res) => {
    await AdminLogin(req.body, res)
});

app.post('/bootcampadminregister', async (req, res) => {
    await AdminRegister(req.body, res)
});


// ***********************************BootCamp***************************************************** //
app.post('/uploadfile', initiateMulter(), async (req, res) => {
    const { materialName, theme } = req.body;
    if (req.files) {
        await UploadFiles(req?.files, theme, materialName, res)
    }
});

app.post('/files', async (req, res) => {
    await Materials(res)
});

app.get('/file/:filename', async (req, res) => {
    const { filename } = req.params;
    await FileByName(filename, res)
});

app.post('/deletefile', async (req, res) => {
    await DeleteMaterial(req.body.theme, req.body.photo, req.body.pdf, res)
})

app.post('/editfile', async (req, res) => {
    await EditMaterial(req.body.theme, res)
})

app.post('/deleteallfiles', async (req, res) => {
    await DeleteMaterials(res)
})

app.post('/inserttask', async (req, res) => {
    await InsertTask(req.body.day, req.body.task, req.body.description, req.body.marks, res)
})

app.post('/deletetask', async (req, res) => {
    await DeleteTasks(req.body.selectday, req.body.selecttask, res)
})

app.post('/edittask', async (req, res) => {
    await EditTasks(req.body.selectday, req.body.selecttask, req.body.selectdesc, req.body.selectmarks, req.body.index, res)
})

app.post('/showtask', async (req, res) => {
    await ShowTasks(req.body.selectday, req.body.index, res)
})

app.post('/hidetask', async (req, res) => {
    await HideTasks(req.body.selectday, req.body.index, res)
})

app.post('/showday', async (req, res) => {
    await ShowDay(req.body.dayshow, res)
})

app.post('/hideday', async (req, res) => {
    await HideDay(req.body.dayhide, res)
})

app.post('/tasks', async (req, res) => {
    await Tasks(res)
})

app.post('/bootcampstudents', async (req, res) => {
    await Students(res)
})

app.post('/attendstudent/:regd', async (req, res) => {
    await AttendStudent(req.params.regd, res)
})

app.post('/updatestudent', async (req, res) => {
    await UpdateStudent(req.body.student, res)
})

app.post('/deletestudent', async (req, res) => {
    await DeleteStudent(req.body.student, res)
})

app.post('/deletestudents', async (req, res) => {
    await DeleteAll(res)
})

app.post('/absentstudent/:regd', async (req, res) => {
    await AbsentStudent(req.params.regd, res)
})

app.post('/givenmarks', async (req, res) => {
    await GivenMarks(req.body.user, req.body.marks, req.body.dayindex, req.body.taskindex, res)
})

app.post('/studentxlsx', initiateMulter(), async (req, res) => {
    await UploadStudents(req?.files[0], res)
})

app.post('/internalmarks', async (req, res) => {
    await InternalMarks(req.body.user, req.body.marks, res)
})

app.post('/activitymarks', async (req, res) => {
    await ActivityMarks(req.body.user, req.body.marks, res)
})


// *************************************************Hackathon****************************************** //

app.post('/insertstatement', async (req, res) => {
    await InsertPS(req.body.number, req.body.statement, req.body.description, req.body.theme, res)
})

app.post('/editstatement', async (req, res) => {
    await EditPS(req.body.selectnumber, req.body.selectstatement, req.body.selectdesc, req.body.theme, res)
})

app.post('/deletestatement', async (req, res) => {
    await DeletePS(req.body.selectstatement, res)
})

app.post('/statements', async (req, res) => {
    await PSS(res)
})

app.post('/teamsinput', async (req, res) => {
    await AddTeamCodes(req.body.teams, res)
})

app.post('/deleteteam', async (req, res) => {
    await DeleteTeam(req.body.teams, res)
})

app.post('/teamscodes', async (req, res) => {
    await AllTeamCodes(res)
})

app.post('/teamregistrers', async (req, res) => {
    await AllTeamRegistrers(res)
})

app.post('/createregistrer', async (req, res) => {
    await CreateRegistrer(req, res);
});

app.delete('/deleteregistrer/:id', async (req, res) => {
    await DeleteRegistrer(req, res);
});

app.put('/updateregistrerstatus/:id', async (req, res) => {
    await UpdateRegistrerStatus(req, res);
});

app.post('/insertround', async (req, res) => {
    await InsertRound(req.body.code, req.body.roundno, req.body.task, req.body.desc, res)
})

app.post('/deleteround', async (req, res) => {
    await DeleteRound(req.body.code, req.body.roundno, req.body.task, req.body.desc, res)
})

app.post('/roundmarks', async (req, res) => {
    await RoundMarks(req.body.code, req.body.marks, req.body.taskindex, res)
})

app.post('/starthack', async (req, res) => {
    await StartHackathon("hackathon@gmail.com", res)
})

app.post('/stophack', async (req, res) => {
    await EndHackathon("hackathon@gmail.com", res)
})

app.post('/hackinternalmarks', async (req, res) => {
    await HackInternalMarks(req.body.code, req.body.marks, res)
})

app.post('/hackactivitymarks', async (req, res) => {
    await HackActivityMarks(req.body.code, req.body.marks, res)
})

export default app;