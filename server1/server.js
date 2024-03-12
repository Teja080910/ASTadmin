const cors =require('cors');
const express=require('express');
// const {connectToDB,db}=require('db1.js')
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

app.get('/',(req,res)=>{
    res.json("server is running successfully!");
})

try
{  
    // ************************************** Admin *****************************************//
app.post('/admincheck/:name/:password',async(req,res)=>
{
    await db.collection('admin').findOne({Gmail:req.params.name,Password:req.params.password})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
    
})
app.post('/adminregi/:gmail/:password',async(req,res)=>
{
    await db.collection('admin').insertOne({Gmail:req.params.gmail,Password:req.params.password})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})
app.post('/updateadmin/:gmail/:date/:days',async(req,res)=>
{
    await db.collection('admin').findOneAndUpdate({Gmail:req.params.gmail},{$set:{Dates:req.params.date,Days:req.params.days}})&&
    await db.collection('Totaldays').findOneAndUpdate({Team:"AST"},{$set:{Days:req.params.days,Scum:req.params.gmail,Date:req.params.date}})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})



// ****************************************** Total days ********************************//
app.post('/totaldays',async(req,res)=>
{
    await db.collection('Totaldays').findOne({Team:"AST"})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})
//  **************************************** Students *************************************************//
app.post('/signup/:email/:name/:regd/:year/:branch/:num',async(req,res)=>
{
    await db.collection('Signup').insertOne({Gmail:req.params.email,Name:req.params.name,Reg_No:req.params.regd,Year:req.params.year,Branch:req.params.branch,Num:req.params.num})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))})
app.get('/students',async(req,res)=>
{
    await db.collection('Signup').find().toArray()
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))})
app.get('/student/:gmail',async(req,res)=>
{
    await db.collection('Signup').findOne({Gmail:req.params.gmail})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})
app.post('/updatestudent/:gmail/:year',async(req,res)=>
{
    await db.collection('Signup').findOneAndUpdate({Gmail:req.params.gmail},{$set:{Year:req.params.year}})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})
app.post('/deletestudent/:mail',async(req,res)=>
{
    await db.collection('Signup').deleteOne({Gmail:req.params.mail})
    .then((details)=>
    {
        res.json(details)
    })
    .catch((e)=>console.log(e))
})
app.post('/loginstudent/:gmail/:num/:date',async(req,res)=>
{
    await db.collection('Signup').findOneAndUpdate({Gmail:req.params.gmail},{$set:{Num:req.params.num,Login:req.params.date}})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})
app.post('/worksubmit/',async(req,res)=>
{
    await db.collection('Signup').findOneAndUpdate({Gmail:req.body.name},{$push:{[`Works.${req.body.date}`]:req.body.work}})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})

//  ************************************************* projects ************************************************//
app.post('/project',async(req,res)=>
{
    await db.collection("Signup").findOne({Gmail:req.body.gmail})
    .then((details)=>
    {
        if(details)
        {
            db.collection("Projects").findOne({Gmail:req.body.gmail})
            .then((details)=>
            {
                if(details)
                {
                    db.collection("Projects").findOneAndUpdate({Gmail:req.body.gmail},{$push:{Projects:{Projectname:req.body.proname,Projectlink:req.body.project}}})
                    .then((details)=>
                    {
                        res.json(details)
                    })
                    .catch((e)=>console.log(e))
                }
                else
                {
                    db.collection("Projects").insertOne({Gmail:req.body.gmail,Name:req.body.name,Projects:[{Projectname:req.body.proname,Projectlink:req.body.project}]})
                        .then((details) => {
                            res.json(details);
                        })
                        .catch((e) => console.log(e)) 
                }
            })
            .catch((e)=>console.log(e))
        }
        else
        {
            res.json({message:"Not found"})
        }
    })
    .catch((e)=>console.log(e))   
})
app.post('/delete',async(req,res)=>
{
    await db.collection("Projects").findOneAndUpdate({Gmail:req.body.del.dat.Gmail},{$pull:{Projects:{Projectlink:req.body.del.val.Projectlink}}})
    .then((details)=>
    {
        res.json(details)
    })
    .catch((e)=>console.log(e))
})
app.post('/like',async(req,res)=>
{
    await db.collection("Projects").findOne({Gmail:req.body.del.dat.Gmail,[`Projects.${req.body.del.index}.Likes`]:req.body.del.mail})
    .then((details)=>
    {
        if(!details)
        {
            db.collection("Projects").findOneAndUpdate({ Gmail: req.body.del.dat.Gmail }, { $push: { [`Projects.${req.body.del.index}.Likes`]: req.body.del.mail } })
                .then((details) => {
                    res.json(details)
                })
                .catch((e) => console.log(e))
        }
    })
    .catch((e) => console.log(e))
})
app.post('/unlike',async(req,res)=>
{
    await db.collection("Projects").findOneAndUpdate({ Gmail: req.body.del.dat.Gmail }, { $pull: { [`Projects.${req.body.del.index}.Likes`]: req.body.del.mail } })
    .then((details) => {
        res.json(details)
    })
    .catch((e) => console.log(e))
})

app.post('/pro',async(req,res)=>
{
    await db.collection("Project").insertOne({Link:req.body.link})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})
app.post('/pro',async(req,res)=>
{
    await db.collection("Project").find().toArray()
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})
app.post('/projects',async(req,res)=>
{
    await db.collection("Projects").find().toArray()
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})

// ******************************************* sadhana *****************************************//
app.post('/sadhanasignup/:email',async(req,res)=>
{
    await db.collection('Signup').findOneAndUpdate({Gmail:req.params.email},{$set:{SadhanaReg:true,MrngStreak:0}})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})
app.post('/sadhanaloginstudent/:gmail/:num/:date',async(req,res)=>
{
    await db.collection('Signup').findOneAndUpdate({Gmail:req.params.gmail},{$set:{MrngStreak:req.params.num,MrngLogin:req.params.date}})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})
app.post('/teja/:name/:num',async(req,res)=>
{
    const index=req.params.num;
    const data=db.collection("Teja");
    await data.updateOne({'comments.1':"Teja"}, {$set:{[`comments.${index}`]:[5]}})
    .then((details)=>
    {
        res.json(details);
    })
    .catch((e)=>console.log(e))
})
}
catch(e)
{
    console.log(e);
}


app.listen(8000, connectToDB(()=>
    {
        console.log("Server is running on port " + 8000);
    })
    ) 