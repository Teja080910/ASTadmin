import { db1 } from "../db.js";

export const BootcamTeamMiddlware = async (req, res, next) => {
    const { mail,password } = req.body;
    try {
        const admin = await db1.collection('Hackathonadmin').findOne({ Gmail:mail });
        if (!admin) {
            return res.send({ error: "something went wrong" })
        }
        if (admin?.Password === password) {
            next()
        }
        else {
            return res.send({ error: "something went wrong" })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signin' });
    }
}