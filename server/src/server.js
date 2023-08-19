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
    const details=await db.collection('admin').findOne({Name:req.params.name,Password:req.params.password})
    res.json(details);
})
app.post('/updateadmin/:name/:date',async(req,res)=>
{
    const details=await db.collection('admin').findOneAndUpdate({Name:req.params.name},{$set:{Dates:req.params.date}})
    res.json(details);
})
 app.get('/mailcheck/:mail',async(req,res)=>
{
    const details=await dbs.collection('Signup').findOne({Gmail:req.params.mail})
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
app.post('/savestudent/:gmail/:regi',async(req,res)=>
{
    const details=await db.collection('Login').insertOne({Gmail:req.params.gmail,Reg_No:req.params.regi})
    res.json(details);
})

app.get('/showsavestu',async(req,res)=>
{
    const details=await db.collection('Login').find().toArray()
    res.json(details);
})
app.post('/streak/:email/:name/:regd/:year/:branch/:num',async(req,res)=>
{
    const details=await db.collection('Signup').findOneAndUpdate({Gmail:req.params.email,Name:req.params.name,Reg_No:req.params.regd,Year:req.params.year,Branch:req.params.branch},{$set:{Num:req.params.num}})
    res.json(details);
})
app.post('/delete',async(req,res)=>
{
    const details=await db.collection('Login').deleteMany()
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
      console.log("Server Running At port 8000");
    })
})