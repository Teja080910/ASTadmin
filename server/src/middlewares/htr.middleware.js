import { db1 } from "../db.js";

export const HtrTeamMiddlware = async (req, res, next) => {
    const { mail, password } = req.body;
    try {
        const admin = await db1.collection('Htrs').findOne({ Gmail: mail });
        if (!admin) {
            return res.send({ error: "something went wrong" })
        }
        if (admin?.Password === password) {
            next()
        }
        else {
            return res.json({ error: "Not Authorized" })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signin' });
    }
}