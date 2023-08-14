import { MongoClient } from "mongodb";
let db; 
async function connectToDB(cb){
    const url = "mongodb+srv://tejasimma033:Teja2002@cluster0.74jcr0b.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("Mern_Attendance");
    cb();
}

export { connectToDB, db };
