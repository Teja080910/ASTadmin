import { db1 } from "../../db.js"

export const InsertTask = async (day, task, desc, marks, res) => {
    try {
        const tasks = await db1.collection("Tasks").findOne({ Day: day })
        if (tasks?.Day) {
            const updatetask = await db1.collection("Tasks").findOneAndUpdate({ Day: day }, { $push: { Tasks: { Task: task, Desc: desc ,Marks:marks} } })
            if (updatetask) {
                res.json(updatetask)
            }
        }
        else {
            const inserttask = await db1.collection("Tasks").insertOne({ Day: day, Tasks: [{ Task: task, Desc: desc ,Marks:marks}] })
            if (inserttask) {
                res.json(inserttask)
            }
        }
    } catch (error) {
        console.log(error)
    }
}