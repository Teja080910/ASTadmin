import { db1 } from "../../db.js"

export const InsertPS = async ( number,statement,description, res) => {
    try {
        const tasks = await db1.collection("ProblemStatements").findOne({ Statement: statement })
        if (!tasks?._id) {
            const insertps = await db1.collection("ProblemStatements").insertOne({ Statement: statement, Number: number, Count: 0,Desc:description })
            if (insertps) {
                res.json({message:"insert sucessfully",data:insertps})
            }
        }
        else {
            res.json({error:"already exist"})
        }
    } catch (error) {
        console.log(error)
    }
}