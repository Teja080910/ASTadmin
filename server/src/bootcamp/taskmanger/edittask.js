import { db1 } from "../../db.js"

export const EditTasks = async (day,task,desc,index,res) => {
    try {
        const tasks = await db1.collection("Tasks").findOne({ Day: day })
        if (tasks?._id) {
            const updatetask = await db1.collection("Tasks").findOneAndUpdate({ Day: day }, { $set: { [`Tasks.${index}.Task`]:task,[`Tasks.${index}.Desc`]:desc } })
            if (updatetask?.value) {
                res.json(updatetask)
            }
        }
    } catch (error) {
        console.log(error)
    }
}