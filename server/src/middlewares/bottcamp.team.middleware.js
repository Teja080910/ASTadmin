import { db1 } from "../db.js";

export const BootcamTeamMiddlware = async (req, res, next) => {
    // const { mail, password } = req.body;
    const {admail,adpass}= req.headers;
    try {
        const admin = await db1.collection('Hackathonadmin').findOne({ Gmail: admail });
        console.log(admin,admail,adpass);
        if (!admin) {
            return res.json({ error: "something went wrong" })
        }
        if (admin?.Password === adpass && admin?.isAdmin) {
            next()
        }
        else {
            return res.json({ error: "Not Authorized" })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error during signin' });
    }
}