import cors from 'cors';
import express from 'express';
import { connectToDB, db } from "./db.js";
const app = express()
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.json("server is running successfully!");
})

try
{
app.get('/admincheck/:name/:password',async(req,res)=>
{
    const details=await db.collection('admin').findOne({Gmail:req.params.name,Password:req.params.password})
    res.json(details);
})
app.post('/adminregi/:gmail/:password',async(req,res)=>
{
    const details=await db.collection('admin').insertOne({Gmail:req.params.gmail,Password:req.params.password})
    res.json(details);
})
app.post('/updateadmin/:gmail/:date/:days',async(req,res)=>
{
    const details=await db.collection('admin').findOneAndUpdate({Gmail:req.params.gmail},{$set:{Dates:req.params.date,Days:req.params.days}})&&
    await db.collection('Totaldays').insertOne({Days:req.params.days,Scum:req.params.gmail})
    res.json(details);
})
app.post('/signup/:email/:name/:regd/:year/:branch/:num',async(req,res)=>
{
    const details=await db.collection('Signup').insertOne({Gmail:req.params.email,Name:req.params.name,Reg_No:req.params.regd,Year:req.params.year,Branch:req.params.branch,Num:req.params.num});
    res.json(details);
})
app.get('/students',async(req,res)=>
{
    const details=await db.collection('Signup').find().toArray()
    res.json(details);
})
app.get('/student/:gmail',async(req,res)=>
{
    const details=await db.collection('Signup').findOne({Gmail:req.params.gmail})
    res.json(details);
})
app.post('/loginstudent/:gmail/:num/:date',async(req,res)=>
{
    const details=await db.collection('Signup').findOneAndUpdate({Gmail:req.params.gmail},{$set:{Num:req.params.num,Login:req.params.date}})
    res.json(details);
})
app.post('/streak/:email/:num',async(req,res)=>
{
    const details=await db.collection('Signup').findOneAndUpdate({Gmail:req.params.email},{$set:{Num:req.params.num}})
    res.json(details);
})
app.post('/worksubmit/:gmail/:work',async(req,res)=>
{
    const details=await db.collection('Signup').findOneAndUpdate({Gmail:req.params.gmail},{$set:{Work:req.params.work}})
    res.json(details);
})
app.post('/project/:name/:project',async(req,res)=>
{
    const details=await db.collection("Projects").insertOne({Name:req.params.name,Project:req.params.project})
    res.json(details);
})
app.get('/projects',async(req,res)=>
{
    const details=await db.collection("Projects").find().toArray()
    res.json(details);
})
}
catch(e)
{
    console.log(e);
}
connectToDB(()=>{
    app.listen(8000,()=>{
        console.log("server running at 8000");
    })
})