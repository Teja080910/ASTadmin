import { db1 } from "../../db.js"

export const DeletePS = async (statement, res) => {
    try {
        await db1.collection("Teams").findOneAndUpdate({ "PS.Statement": statement }, { $unset: { PS: statement } })
        const deletetask = await db1.collection("ProblemStatements").deleteOne({ Statement: statement })
        if (deletetask) {
            res.json(deletetask)
        }
    } catch (error) {
        console.log(error)
    }
}