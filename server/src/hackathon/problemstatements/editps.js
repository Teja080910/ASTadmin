import { db1 } from "../../db.js"

export const EditPS = async (number, statement, desc,theme,res) => {
    try {
        const editps = await db1.collection("ProblemStatements").findOneAndUpdate({ Number: number }, { $set: { Statement: statement,Desc:desc,Theme:theme} })
        if (editps?.value?.Statement) {
            res.json(editps)
        }
    } catch (error) {
        console.log(error)
    }
}

export const SelectPs = async (number, statement, res) => {
    try {
        const select = await db1.collection("ProblemStatements").findOne({ Statement: statement })
        if (select?._id && select?.Count<2) {
            const count = parseInt(select?.Count) + 1
            const editps = await db1.collection("ProblemStatements").findOneAndUpdate({ Statement: statement }, { $set: { Count:count} })
            if (editps?.value) {
                res.json(editps)
            }
        }

    } catch (error) {
        console.log(error)
    }
}