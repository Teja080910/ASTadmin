import cors from 'cors';
import express from 'express';
import { connectToDB, db } from "./db.js";
const app = express()
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("server is running successfully!");
})

try
{
app.get('/admin/:name/:password',async(req,res)=>
{
    const details=await db.collection('admin').findOne({Name:req.params.name,Password:req.params.password})
    res.json(details);
})
 app.get('/mailcheck/:mail',async(req,res)=>
{
    const details=await db.collection('signup').findOne({Gmail:req.params.mail})
    res.json(details);
})
app.post('/signup/:email/:name/:regd/:year/:branch/:num',async(req,res)=>
{
    const details=await db.collection('signup').insertOne({Gmail:req.params.email,Name:req.params.name,Reg_No:req.params.regd,Year:req.params.year,Branch:req.params.branch,Num:req.params.num});
    res.json(details);
})
app.get('/students',async(req,res)=>
{
    const details=await db.collection('signup').find().toArray()
    res.json(details);
})
app.get('/student/:gmail',async(req,res)=>
{
    const details=await db.collection('signup').findOne({Gmail:req.params.gmail})
    res.json(details);
})
app.post('/savestudent/:gmail/:regi',async(req,res)=>
{
    const details=await db.collection('login').insertOne({Gmail:req.params.gmail,Reg_No:req.params.regi})
    res.json(details);
})

app.get('/showsavestu',async(req,res)=>
{
    const details=await db.collection('login').find().toArray()
    res.json(details);
})
app.post('/streak/:email/:name/:regd/:year/:branch/:num',async(req,res)=>
{
    const details=await db.collection('signup').findOneAndUpdate({Gmail:req.params.email,Name:req.params.name,Reg_No:req.params.regd,Year:req.params.year,Branch:req.params.branch},{$set:{Num:req.params.num}})
    res.json(details);
})
app.post('/delete',async(req,res)=>
{
    const details=await db.collection('login').deleteMany()
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