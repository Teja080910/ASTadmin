import { db1 } from "../../db.js"
export const AddTeamCodes = async (size, res) => {
    let code = 1001;
    let i = 0;
    while (i < size) {
        code =code + 100 + i * 8;
        const existcode = await db1.collection("Teams").findOne({ TeamCode: code })
        if (existcode?._id) {
            i++;
        }
        else {
            const insertcode = await db1.collection("Teams").insertOne({ TeamCode: code })
            if (insertcode) {
                i++;
            }
        }
        if (i == size - 1) {
            res.json({ message: "add codes" })
        }
    }
}