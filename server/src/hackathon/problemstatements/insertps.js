import { db1 } from "../../db.js"

export const InsertPS = async (number, statement, description, theme, res) => {
    try {
        const tasks = await db1.collection("ProblemStatements").findOne({ $or: [{ Statement: statement }, { Number: number }] });
        if (!tasks?._id) {
            const insertps = await db1.collection("ProblemStatements").insertOne({ Statement: statement, Number: number, Count: 0, Desc: description, Theme: theme })
            if (insertps) {
                res.json({ message: "insert sucessfully", data: insertps })
            }
        }
        else {
            res.json({ error: "already exist" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const PssCount = async (count, res) => {
    try {
        const pss = await db1.collection("ProblemStatements").findOne({ Statement: "Problem Satement" })
        if (!pss?._id) {
            const insertps = await db1.collection("ProblemStatements").insertOne({ Statement: "Problem Satement", Members: count?.members, Statements: count?.statements })
            if (insertps) {
                res.json({ message: "insert sucessfully", data: insertps })
            }
        }
        else {
            const insertps = await db1.collection("ProblemStatements").findOneAndUpdate({ Statement: "Problem Satement" }, { $set: { Members: count?.members, Statements: count?.statements } })
            if (insertps) {
                res.json({ message: "insert sucessfully", data: insertps })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const PSSC = async (res) => {
    try {
        const pss = await db1.collection("ProblemStatements").findOne({ Statement: "Problem Satement" })
        res.json({ message: "insert sucessfully", data: pss })
    } catch (error) {
        console.log(error)
    }
}