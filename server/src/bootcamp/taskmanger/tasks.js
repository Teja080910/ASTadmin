import { db1 } from "../../db.js"

export const Tasks = async (res) => {
    try {
        const tasks = await db1.collection("Tasks").find().toArray()
        if (tasks.length > 0) {
            res.json(tasks)
        }
    } catch (error) {
        console.log(error)
    }
}