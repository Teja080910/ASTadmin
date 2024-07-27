import { db1 } from "../../db.js"
export const AddTeamCodes = async (size, res) => {
    try {
        let code = 1001;
        let i = 0;
        while (i < size) {
            code = code + 100 + i * 8;
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
    } catch (error) {

    }
}

export const DeleteTeam = async (team,res) => {
    try {
        await db1.collection('Teams').findOneAndUpdate({ TeamCode: parseInt(team) }, { $set: { Team: null, Gmail: null, Phone: null, Members: null, Password: null,Year:null } })
            .then((details) => {
               
                if (details?.value?._id) {
                    res.json({ message: "success", data: details });
                }
            })
            .catch((e) => console.log(e))
    } catch (error) {
        console.log(error)
    }
}