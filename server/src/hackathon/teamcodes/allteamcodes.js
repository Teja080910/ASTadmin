import { db1 } from "../../db.js"
export const AllTeamCodes = async (res) => {
    const allteams = await db1.collection("Teams").find().toArray()
    if (allteams) {
        res.json(allteams)
    }
}