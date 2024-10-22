import { db1 } from "../db.js";

export const BootcamEditMiddlware = async (req, res, next) => {
    const { admail, adpass } = req.headers;
    try {
        const admin = await db1.collection('Hackathonadmin').findOne({ Gmail: admail });
        if (!admin) {
            return res.send({ error: "something went wrong" })
        }
        if (admin?.Password === adpass && admin?.isEdit) {
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