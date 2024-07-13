import dotenv from 'dotenv';
import { GridFSBucket, MongoClient } from 'mongodb';
dotenv.config();

let db, db1,db2, bucket;

async function connectToDB({ database, datacb, cb }) {
    const url = process.env.database;
    const client = new MongoClient(url);
    await client.connect();
    db = client.db("Mern_Attendance");

    const url1 = process.env.database1;
    const client1 = new MongoClient(url1);
    await client1.connect();
    db2 = client1.db("Hackathon");
    
    if (cb) cb();

    if (database) {
        db1 = client1.db(database);
        bucket = new GridFSBucket(db1, { bucketName: 'uploads' });
        if (datacb) datacb();
    }
}

export { bucket, connectToDB, db, db1,db2 };
