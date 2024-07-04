import { db1 } from "../../db.js";

export const InsertRound = async (code, roundno, task, desc, res) => {
    try {
        const round = await db1.collection("Teams").findOne({ TeamCode: parseInt(code) })
        if (round?.Team) {
            const teamround = round.Rounds?.[roundno] || {};
            teamround.Task = task;
            teamround.Desc = desc;
            const updateround = await db1.collection("Teams").findOneAndUpdate({ TeamCode: parseInt(code) }, { $set: { [`Rounds.${roundno}`]: teamround } })
            if (updateround?.value?._id) {
                res.json({ message: "round updated", data: updateround })
            } else {
                res.json({ error: "updated failed" })
            }
        } else {
            res.json({ error: "Team not registered" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const DeleteRound = async (code, roundno, task, desc, res) => {
    try {
        const round = await db1.collection("Teams").findOne({ TeamCode: parseInt(code) })
        if (round?.Team) {
            const updateround = await db1.collection("Teams").findOneAndUpdate({ TeamCode: parseInt(code) }, { $unset: { [`Rounds.${roundno}`]: { Task: task, Desc: desc } } })
            if (updateround?.value?._id) {
                res.json({ message: "round deleted", data: updateround })
            } else {
                res.json({ error: "deleted failed" })
            }
        } else {
            res.json({ error: "Team not found" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const RoundMarks = async (code, marks, roundno, res) => {
    try {
        const round = await db1.collection("Teams").findOne({ TeamCode: parseInt(code) })
        if (round?.Team) {
            const teamround = round.Rounds?.[roundno] || {};
            teamround.Marks = marks;
            const updateround = await db1.collection("Teams").findOneAndUpdate({ TeamCode: parseInt(code) }, { $set: { [`Rounds.${roundno}`]: teamround } })
            if (updateround?.value?._id) {
                res.json({ message: "round inserted", data: updateround })
            } else {
                res.json({ error: "updated failed" })
            }
        } else {
            res.json({ error: "Team not registered" })
        }
    } catch (error) {
        console.log(error)
    }
}