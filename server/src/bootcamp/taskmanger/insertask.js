import { db1 } from "../../db.js"

export const InsertTask = async (day, task, desc, marks, res) => {
    try {
        const tasks = await db1.collection("Tasks").findOne({ Day: parseInt(day) })
        if (tasks?.Day) {
            const updatetask = await db1.collection("Tasks").findOneAndUpdate({ Day: parseInt(day) }, { $push: { Tasks: { Task: task, Desc: desc, Marks: parseInt(marks) } } })
            if (updatetask) {
                res.json(updatetask)
            }
        }
        else {
            const inserttask = await db1.collection("Tasks").insertOne({ Day: parseInt(day), Tasks: [{ Task: task, Desc: desc, Marks: parseInt(marks) }] })
            if (inserttask) {
                res.json(inserttask)
            }
        }
    } catch (error) {
        console.log(error)
    }
}