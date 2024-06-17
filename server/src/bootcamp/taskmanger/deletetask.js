import { db1 } from "../../db.js"

export const DeleteTasks = async (day,task,res) => {
    try {
        const tasks = await db1.collection("Tasks").findOne({ Day: day })
        if (tasks?._id) {
            const deletetask = await db1.collection("Tasks").findOneAndUpdate({ Day: day }, { $pull: { Tasks:{Task:task}}})
            if (deletetask?.value) {
                res.json(deletetask)
            }
        }
    } catch (error) {
        console.log(error)
    }
}