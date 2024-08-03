import { db1 } from "../../db.js"

export const GivenMarks = async (user, marks, day, task, res) => {
    try {
        const tasks = await db1.collection("Hackathondata").findOne({ Reg_No: user })
        if (tasks?._id) {
            const updatetask = await db1.collection("Hackathondata").findOneAndUpdate({ Reg_No: user }, { $set: { [`Tasks.${day}.${task}.GetMarks`]: marks } })
            if (updatetask?.value) {
                res.json({ message: "update marks", data: updatetask })
            } else {
                res.json({ error: "try again" })
            }
        }
        else {
            res.json({ error: "user not found" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const RemoveTask = async (user, marks, day, task, res) => {
    try {
        const tasks = await db1.collection("Hackathondata").findOne({ Reg_No: user })
        if (tasks?._id) {
            const updatetask = await db1.collection("Hackathondata").findOneAndUpdate({ Reg_No: user }, { $pull: { [`Tasks.${day}`]: { Task: marks } } })
            if (updatetask?.value) {
                res.json({ message: "remove task", data: updatetask })
            } else {
                res.json({ error: "try again" })
            }
        }
        else {
            res.json({ error: "user not found" })
        }
    } catch (error) {
        console.log(error)
    }
}