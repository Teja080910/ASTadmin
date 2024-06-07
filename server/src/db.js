import dotenv from 'dotenv';
import { MongoClient } from "mongodb";
dotenv.config()
let db,db1; 
async function connectToDB(cb){
    const url =process.env.database
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("Mern_Attendance");

    const url1 =process.env.database1
    const client1 = new MongoClient(url1);
    await client1.connect();
    db1 = client1.db("Mern_Attendance");
    cb();
}

export { connectToDB, db,db1};
