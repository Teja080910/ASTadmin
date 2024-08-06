import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Resend } from 'resend';
import { ConsoleMiddleware } from '../ast-console/middleware/console.middleware.js';
import { AdminLogin } from '../bootcamp/admin/adminlogin.js';
import { AdminRegister } from '../bootcamp/admin/adminregister.js';
import { AbsentStudent, AttendStudent } from '../bootcamp/attendance/attendance.js';
import { GetFeedbacks, GetUniqueDatesAndLatestFeedbacks } from '../bootcamp/feedbacks/feedback.js';
import { DeleteMaterial, DeleteMaterials } from '../bootcamp/materials/deletematerials.js';
import { EditMaterial } from '../bootcamp/materials/editmaterial.js';
import { Materials } from '../bootcamp/materials/materials.js';
import { Chunks, FileByName, UploadFiles } from '../bootcamp/materials/uploadmaterials.js';
import { ActivityMarks, InternalMarks } from '../bootcamp/others/others.js';
import { GivenMarks, RemoveTask } from '../bootcamp/scoremanager/score.js';
import { DeleteAll, Student, Students, StudentsNames } from '../bootcamp/studentdata/students.js';
import { DeleteStudent, UpdateStudent } from '../bootcamp/studentdata/updatestudent.js';
import { UploadStudents } from '../bootcamp/studentdata/uploadstudentdata.js';
import { DeleteTasks } from '../bootcamp/taskmanger/deletetask.js';
import { EditTasks } from '../bootcamp/taskmanger/edittask.js';
import { InsertTask } from '../bootcamp/taskmanger/insertask.js';
import { HideDay, HideTasks, ShowDay, ShowTasks } from '../bootcamp/taskmanger/showtask.js';
import { Tasks } from '../bootcamp/taskmanger/tasks.js';
import { BootcamEditMiddlware } from '../middlewares/bootcamp.edit.middleware.js';
import { BootcamTeamMiddlware } from '../middlewares/bottcamp.team.middleware.js';
import { initiateMulter } from '../multer/multer.js';
import { DeleteRound, InsertRound, RoundMarks } from './hacktasks/addround.js';
import { HackActivityMarks, HackInternalMarks } from './others/others.js';
import { DeletePhoto, DeleteTeamPhotos } from './photos/deletephoto.js';
import { UploadPhotos } from './photos/uploadphoto.js';
import { DeletePS } from './problemstatements/deleteps.js';
import { EditPS } from './problemstatements/editps.js';
import { InsertPS, PSSC, PssCount } from './problemstatements/insertps.js';
import { PSS } from './problemstatements/pss.js';
import { EndHackathon } from './start&stop/hackathonend.js';
import { StartHackathon } from './start&stop/hackathonstart.js';
import { AllTeamCodes } from './teamcodes/allteamcodes.js';
import { AddTeamCodes, DeleteTeam } from './teamcodes/teamcodes.js';
import { UpdateTeam } from './teamcodes/updateteam.js';
import { AllTeamRegistrers } from './teamregistrers/allregistrers.js';
import { CreateRegistrer, DeleteRegistrer, UpdateRegistrerStatus } from './teamregistrers/registrersactions.js';
import { CreateTechTeamMember, DeleteTechTeamMember, UpdateTechTeamMemberStatus, UpdateTechTeamMemberSubject } from './techteam/alltechmemberactions.js';
import { AllTechTeamMembers } from './techteam/alltechmembers.js';
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.get('/hackathon', (req, res) => {
    res.json("hackathon server is running.....");
})
const resend = new Resend(process.env.Resend_Key);

app.post('/bootcampadminlogin', async (req, res) => {
    await AdminLogin(req.body, res)
});

app.post('/bootcampadminregister', ConsoleMiddleware, async (req, res) => {
    await AdminRegister(req.body, res)
});


// ***********************************BootCamp***************************************************** //
app.post('/uploadfile', initiateMulter(), ConsoleMiddleware, async (req, res) => {
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

app.post('/deletefile', ConsoleMiddleware, async (req, res) => {
    await DeleteMaterial(req.body.theme, req.body.photo, req.body.pdf, res)
})

app.post('/editfile', BootcamEditMiddlware, async (req, res) => {
    await EditMaterial(req.body.theme, res)
})

app.post('/deleteallfiles', ConsoleMiddleware, async (req, res) => {
    await DeleteMaterials(res)
})

app.post('/aggregatefiles', ConsoleMiddleware, async (req, res) => {
    await Chunks(res)
})

app.post('/inserttask', ConsoleMiddleware, async (req, res) => {
    await InsertTask(req.body.day, req.body.task, req.body.description, req.body.marks, res)
})

app.post('/deletetask', ConsoleMiddleware, async (req, res) => {
    await DeleteTasks(req.body.selectday, req.body.selecttask, res)
})

app.post('/edittask', BootcamEditMiddlware, async (req, res) => {
    await EditTasks(req.body.selectday, req.body.selecttask, req.body.selectdesc, req.body.selectmarks, req.body.index, res)
})

app.post('/showtask', ConsoleMiddleware, async (req, res) => {
    await ShowTasks(req.body.selectday, req.body.index, res)
})

app.post('/hidetask', ConsoleMiddleware, async (req, res) => {
    await HideTasks(req.body.selectday, req.body.index, res)
})

app.post('/showday', ConsoleMiddleware, async (req, res) => {
    await ShowDay(req.body.dayshow, res)
})

app.post('/hideday', ConsoleMiddleware, async (req, res) => {
    await HideDay(req.body.dayhide, res)
})

app.post('/tasks', async (req, res) => {
    await Tasks(res)
})

app.post('/bootcampstudetnames', async (req, res) => {
    await StudentsNames(res)
})

app.post('/bootcampstudents', async (req, res) => {
    await Students(res)
})

app.post('/bootcampstudent',BootcamTeamMiddlware, async (req, res) => {
    await Student(req.body.reg, res)
})

app.post('/attendstudents', BootcamTeamMiddlware, async (req, res) => {
    await AttendStudent(req.body.registerno, res)
})

app.post('/updatestudent', BootcamEditMiddlware, async (req, res) => {
    await UpdateStudent(req.body.student, res)
})

app.post('/deletestudent', ConsoleMiddleware, async (req, res) => {
    await DeleteStudent(req.body.student, res)
})

app.post('/deletestudents', ConsoleMiddleware, async (req, res) => {
    await DeleteAll(res)
})

app.post('/absentstudent', BootcamTeamMiddlware, async (req, res) => {
    await AbsentStudent(req.body.registerno, res)
})

app.post('/givenmarks', BootcamTeamMiddlware, async (req, res) => {
    await GivenMarks(req.body.user, req.body.marks, req.body.dayindex, req.body.taskindex, res)
})

app.post('/removetask', BootcamTeamMiddlware, async (req, res) => {
    await RemoveTask(req.body.user, req.body.marks, req.body.dayindex, req.body.taskindex, res)
})

app.post('/studentxlsx', initiateMulter(), ConsoleMiddleware, async (req, res) => {
    await UploadStudents(req?.files[0], res)
})

app.post('/internalmarks', BootcamTeamMiddlware, async (req, res) => {
    await InternalMarks(req.body.user, req.body.marks, res)
})

app.post('/activitymarks', BootcamTeamMiddlware, async (req, res) => {
    await ActivityMarks(req.body.user, req.body.marks, res)
})

app.post('/feedbacks', ConsoleMiddleware, GetFeedbacks);

app.get('/feedbacks/unique-dates', ConsoleMiddleware, GetUniqueDatesAndLatestFeedbacks);

// *************************************************Hackathon****************************************** //

app.post('/insertstatement', ConsoleMiddleware, async (req, res) => {
    await InsertPS(req.body.number, req.body.statement, req.body.description, req.body.theme, req.body.idealfor, res)
})

app.post('/editstatement', ConsoleMiddleware, async (req, res) => {
    await EditPS(req.body.selectnumber, req.body.selectstatement, req.body.selectdesc, req.body.theme, res)
})

app.post('/psscount', ConsoleMiddleware, async (req, res) => {
    await PssCount(req.body.count, res)
})

app.post('/pssc', async (req, res) => {
    await PSSC(res)
})

app.post('/deletestatement', ConsoleMiddleware, async (req, res) => {
    await DeletePS(req.body.selectstatement, res)
})

app.post('/statements', async (req, res) => {
    await PSS(res)
})

app.post('/teamsinput', ConsoleMiddleware, async (req, res) => {
    await AddTeamCodes(req.body.teams, res)
})

app.post('/deleteteam', BootcamEditMiddlware, async (req, res) => {
    await DeleteTeam(req.body.teams, res)
})

app.post('/updateteam/:team/:gmail/:phone/:code/:members', BootcamEditMiddlware, async (req, res) => {
    await UpdateTeam(req, res, resend);
})

app.post('/teamscodes', async (req, res) => {
    await AllTeamCodes(res)
})

app.post('/teamregistrers', async (req, res) => {
    await AllTeamRegistrers(res)
})

app.post('/createregistrer', BootcamEditMiddlware, async (req, res) => {
    await CreateRegistrer(req, res);
});

app.delete('/deleteregistrer/:id', BootcamEditMiddlware, async (req, res) => {
    await DeleteRegistrer(req, res);
});

app.put('/updateregistrerstatus/:id', BootcamEditMiddlware, async (req, res) => {
    await UpdateRegistrerStatus(req, res);
});

app.post('/teammembers', async (req, res) => {
    await AllTechTeamMembers(res);
});

app.post('/createtechteammember', BootcamEditMiddlware, async (req, res) => {
    await CreateTechTeamMember(req, res);
});

app.delete('/deletetechteammember/:id', BootcamEditMiddlware, async (req, res) => {
    await DeleteTechTeamMember(req, res);
});

app.put('/updatetechteammemberstatus/:id', BootcamEditMiddlware, async (req, res) => {
    await UpdateTechTeamMemberStatus(req, res);
});

app.put('/updatetechteammembersubject/:id', BootcamEditMiddlware, async (req, res) => {
    await UpdateTechTeamMemberSubject(req, res);
});

app.post('/insertround', ConsoleMiddleware, async (req, res) => {
    await InsertRound(req.body.code, req.body.roundno, req.body.task, req.body.desc, res)
})

app.post('/deleteround', ConsoleMiddleware, async (req, res) => {
    await DeleteRound(req.body.code, req.body.roundno, req.body.task, req.body.desc, res)
})

app.post('/roundmarks', ConsoleMiddleware, async (req, res) => {
    await RoundMarks(req.body.code, req.body.marks, req.body.taskindex, res)
})

app.post('/starthack', ConsoleMiddleware, async (req, res) => {
    await StartHackathon("hackathon@gmail.com", res)
})

app.post('/stophack', ConsoleMiddleware, async (req, res) => {
    await EndHackathon("hackathon@gmail.com", res)
})

app.post('/hackinternalmarks', ConsoleMiddleware, async (req, res) => {
    await HackInternalMarks(req.body.code, req.body.marks, res)
})

app.post('/hackactivitymarks', ConsoleMiddleware, async (req, res) => {
    await HackActivityMarks(req.body.code, req.body.marks, res)
})

app.post('/uploadphotos', initiateMulter(), BootcamEditMiddlware, async (req, res) => {
    const { teamname } = req.body;
    if (req.files) {
        await UploadPhotos(req?.files, teamname, res)
    }
});

app.post('/files', async (req, res) => {
    await Materials(res)
});

app.post('/deletephoto', BootcamEditMiddlware, async (req, res) => {
    await DeletePhoto(req.body.photo, req.body.team, res)
})

app.post('/deleteallphotos', BootcamEditMiddlware, async (req, res) => {
    await DeleteTeamPhotos(req.body.team, res)
})


export default app;