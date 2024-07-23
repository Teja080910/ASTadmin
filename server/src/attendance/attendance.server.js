import { Client } from '@octoai/client';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { Resend } from 'resend';
import { db } from '../db.js';
import { AttendStudent } from './attendancelogin.js';
import { SendOtp } from './sendotp.js';

dotenv.config();
const app = express();
const port = 3000;
const resend = new Resend(process.env.Resend_Key);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'teja&90ohytgi',
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/',
        secure: false,
        maxAge: 600000,
        sameSite: 'strict'
    }
}));

app.get('/attendance', (req, res) => {
    res.json("attendance server is running.....");
});

app.post('/sendotp', async (req, res) => {
    await SendOtp(req, resend, res)
});

app.post('/signin-student', async (req, res) => {
    await AttendStudent(req, res)
});

try {
    const client1 = new Client(process.env.OCTOAI_TOKEN);

    app.post('/pdfprint', async (req, res) => {
        const completion = await client1.chat.completions.create({
            "messages": [
                {
                    "role": "system",
                    "content": req.body.text1
                },
                {
                    "role": "user",
                    "content": req.body.text ? `PDF content:\n${req.body.text}` : req.body.text1
                }
            ],
            "model": "llama-2-13b-chat-fp16",
            "max_tokens": 3000,
            "presence_penalty": 0,
            "temperature": 0.1,
            "top_p": 0.9
        });
        if (completion.choices[0].message.content) {
            res.json(completion.choices[0].message.content)
        }
    })


    // ************************************** Admin *****************************************//
    app.post('/admincheck/:name/:password', async (req, res) => {
        await db.collection('admin').findOne({ Gmail: req.params.name, Password: req.params.password })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })


    app.post('/admincheck/:name', async (req, res) => {
        await db.collection('admin').findOne({ Gmail: req.params.name })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })


    app.post('/adminregi/:gmail/:password', async (req, res) => {
        await db.collection('admin').insertOne({ Gmail: req.params.gmail, Password: req.params.password })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })
    app.post('/updateadmin/:gmail/:date/:days', async (req, res) => {
        await db.collection('admin').findOneAndUpdate({ Gmail: req.params.gmail }, { $set: { Dates: req.params.date, Days: req.params.days } }) &&
            await db.collection('Totaldays').findOneAndUpdate({ Team: "AST" }, { $set: { Days: req.params.days, Scum: req.params.gmail, Date: req.params.date } })
                .then((details) => {
                    res.json(details);
                })
                .catch((e) => console.log(e))
    })



    // ****************************************** Total days ********************************//
    app.post('/totaldays', async (req, res) => {
        await db.collection('Totaldays').findOne({ Team: "AST" })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })
    //  **************************************** Students *************************************************//
    app.post('/signup/:email/:name/:regd/:year/:branch/:num', async (req, res) => {
        await db.collection('Signup').insertOne({ Gmail: req.params.email, Name: req.params.name, Reg_No: req.params.regd, Year: req.params.year, Branch: req.params.branch, Num: req.params.num })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })
    app.post('/students', async (req, res) => {
        await db.collection('Signup').find().toArray()
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })
    app.post('/attendance', async (req, res) => {
        await db.collection('Attendance').find().toArray()
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })
    app.post('/student/:gmail', async (req, res) => {
        await db.collection('Signup').findOne({ Gmail: req.params.gmail })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })
    app.post('/updatestudent/:gmail/:name/:year', async (req, res) => {
        await db.collection('Signup').findOneAndUpdate({ Gmail: req.params.gmail }, { $set: { Name: req.params.name, Year: req.params.year } })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })
    app.post('/deletestudent/:mail', async (req, res) => {
        await db.collection('Signup').deleteOne({ Gmail: req.params.mail })
            .then((details) => {
                res.json(details)
            })
            .catch((e) => console.log(e))
    })

    app.post('/worksubmit/', async (req, res) => {
        await db.collection('Signup').findOneAndUpdate({ Gmail: req.body.name }, { $push: { [`Works.${req.body.date}`]: req.body.work } })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })

    //  ************************************************* projects ************************************************//
    app.post('/project', async (req, res) => {
        await db.collection("Signup").findOne({ Gmail: req.body.gmail })
            .then((details) => {
                if (details) {
                    db.collection("Projects").findOne({ Gmail: req.body.gmail })
                        .then((details) => {
                            if (details) {
                                db.collection("Projects").findOneAndUpdate({ Gmail: req.body.gmail }, { $push: { Projects: { Projectname: req.body.proname, Projectlink: req.body.project } } })
                                    .then((details) => {
                                        res.json(details)
                                    })
                                    .catch((e) => console.log(e))
                            }
                            else {
                                db.collection("Projects").insertOne({ Gmail: req.body.gmail, Name: req.body.name, Projects: [{ Projectname: req.body.proname, Projectlink: req.body.project }] })
                                    .then((details) => {
                                        res.json(details);
                                    })
                                    .catch((e) => console.log(e))
                            }
                        })
                        .catch((e) => console.log(e))
                }
                else {
                    res.json({ message: "Not found" })
                }
            })
            .catch((e) => console.log(e))
    })
    app.post('/delete', async (req, res) => {
        await db.collection("Projects").findOneAndUpdate({ Gmail: req.body.del.dat.Gmail }, { $pull: { Projects: { Projectlink: req.body.del.val.Projectlink } } })
            .then((details) => {
                res.json(details)
            })
            .catch((e) => console.log(e))
    })
    app.post('/like', async (req, res) => {
        await db.collection("Projects").findOne({ Gmail: req.body.del.dat.Gmail, [`Projects.${req.body.del.index}.Likes`]: req.body.del.mail })
            .then((details) => {
                if (!details) {
                    db.collection("Projects").findOneAndUpdate({ Gmail: req.body.del.dat.Gmail }, { $push: { [`Projects.${req.body.del.index}.Likes`]: req.body.del.mail } })
                        .then((details) => {
                            res.json(details)
                        })
                        .catch((e) => console.log(e))
                }
            })
            .catch((e) => console.log(e))
    })
    app.post('/unlike', async (req, res) => {
        await db.collection("Projects").findOneAndUpdate({ Gmail: req.body.del.dat.Gmail }, { $pull: { [`Projects.${req.body.del.index}.Likes`]: req.body.del.mail } })
            .then((details) => {
                res.json(details)
            })
            .catch((e) => console.log(e))
    })

    app.post('/pro', async (req, res) => {
        await db.collection("Project").insertOne({ Link: req.body.link })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })
    app.post('/pro', async (req, res) => {
        await db.collection("Project").find().toArray()
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })
    app.post('/projects', async (req, res) => {
        await db.collection("Projects").find().toArray()
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })

    // ******************************************* sadhana *****************************************//
    app.post('/sadhanasignup/:email', async (req, res) => {
        await db.collection('Signup').findOneAndUpdate({ Gmail: req.params.email }, { $set: { SadhanaReg: true, MrngStreak: 0 } })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })


    app.post('/zeors', async (req, res) => {
        // await db.collection('Signup').updateMany({ MrngStreak:0 },{ $set: { MrngStreak: 0 } })
        await db.collection('Totaldays').updateMany({ Team: "AST" }, { $set: { Days: 0 } })
            // await db.collection('Signup').updateMany({ Num: { $in: ["9", "0"] } },{ $set: { Num: 0 } })
            .then((e) => console.log(e)).catch((e) => console.log(e))
    })

    app.post('/sadhanaloginstudent/:gmail/:num/:date', async (req, res) => {
        await db.collection('Signup').findOneAndUpdate({ Gmail: req.params.gmail }, { $set: { MrngStreak: req.params.num, MrngLogin: req.params.date } })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })
    app.post('/sendotp/:number', async (req, res) => {
        client.verify.v2.services(verifySid).verifications.create({ to: req.params.number, channel: "sms" })
            .then((verification) => res.json(verification.status))
            .catch((e) => res.json(e.status));
    })
    app.post('/reciveotp/:number/:code', async (req, res) => {
        client.verify.v2.services(verifySid).verificationChecks.create({ to: req.params.number, code: req.params.code })
            .then((verification_check) => res.json(verification_check.status))
            .catch((e) => res.json(e.status));
    })
    app.post('/teja/:name/:num', async (req, res) => {
        const index = req.params.num;
        const data = db.collection("Teja");
        await data.updateOne({ 'comments.1': "Teja" }, { $set: { [`comments.${index}`]: [5] } })
            .then((details) => {
                res.json(details);
            })
            .catch((e) => console.log(e))
    })
}
catch (e) {
    console.log(e);
}

export default app;