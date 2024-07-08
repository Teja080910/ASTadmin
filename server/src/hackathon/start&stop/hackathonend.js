import { db1 } from "../../db.js";
export const EndHackathon = async (data, res) => {
    const { email } = data;
    try {
        await db1.collection('Hacthonadmin').findOneAndUpdate({ Gmail: email }, { $set: { Start: false } })
            .then((details) => {
                res.json({ message: "sucess", data: details });
            })
            .catch((e) => console.log(e))
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signup' });
    }
}