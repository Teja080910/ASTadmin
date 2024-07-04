import { db1 } from "../../db.js"

export const PSS = async (res) => {
    try {
        const tasks = await db1.collection("ProblemStatements").find().toArray()
        if (tasks.length > 0) {
            res.json(tasks)
        }
    } catch (error) {
        console.log(error)
    }
}