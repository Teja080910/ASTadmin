import { db1 } from "../../db.js"

export const ShowTasks = async (day, index, res) => {
    try {
        const tasks = await db1.collection("Tasks").findOne({ Day: day })
        if (tasks?._id) {
            const updatetask = await db1.collection("Tasks").findOneAndUpdate({ Day: day }, { $set: { [`Tasks.${index}.Show`]: true } })
            if (updatetask?.value) {
                res.json(updatetask)
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const HideTasks = async (day, index, res) => {
    try {
        const tasks = await db1.collection("Tasks").findOne({ Day: day })
        if (tasks?._id) {
            const updatetask = await db1.collection("Tasks").findOneAndUpdate({ Day: day }, { $set: { [`Tasks.${index}.Show`]: false } })
            if (updatetask?.value) {
                res.json(updatetask)
            }
        }
    } catch (error) {
        console.log(error)
    }
}