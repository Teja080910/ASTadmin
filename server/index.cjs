const cors =require('cors');
const express=require('express');
const app = express()
app.use(cors())
app.use(express.json())
const MongoClient = require('mongodb').MongoClient;
let db; 
async function connectToDB(cb)
{
    const url = "mongodb+srv://aolsrkr2002:aol1234@ast.th0xtim.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("Mern_Attendance");
    cb();
}

app.post('/',(req,res)=>{
    res.json("server is running successfully!");
})

try
{
app.post('/admincheck/:name/:password',async(req,res)=>
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
    const details=await db.collection('admin').findOneAndUpdate({Gmail:req.params.gmail},{$set:{Dates:req.params.date,Days:req.params.days}})
    res.json(details);
})
app.post('/signup/:email/:name/:regd/:year/:branch/:num',async(req,res)=>
{
    const details=await db.collection('Signup').insertOne({Gmail:req.params.email,Name:req.params.name,Reg_No:req.params.regd,Year:req.params.year,Branch:req.params.branch,Num:req.params.num});
    res.json(details);
})
app.post('/students',async(req,res)=>
{
    const details=await db.collection('Signup').find().toArray()
    res.json(details);
})
app.post('/student/:gmail',async(req,res)=>
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
app.post('/projects',async(req,res)=>
{
    const details=await db.collection("Projects").find().toArray()
    res.json(details);
})
}
catch(e)
{
    console.log(e);
}
module.exports = async (req, res) => {
    app.listen(8000, connectToDB(()=>
    {
        console.log("Server is running on port " + 3000);
    })
    ) 
    // app(req, res);
  };