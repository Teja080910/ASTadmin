import { MongoClient } from "mongodb";
let dbs; 
async function connectToDBS(cb){
    const url = "mongodb+srv://aolsrkr2002:aol1234@ast.th0xtim.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);
    await client.connect();
    dbs = client.db("Mern_Attendance");
    cb();
}

export { connectToDBS, dbs };
