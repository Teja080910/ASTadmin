import { db1 } from "../db.js";

export const BootcamMiddlware = async (req, res, next) => {
    const { password } = req.body;
    try {
        const admin = await db1.collection('Hackathonadmin').findOne({ Gmail: "asthack@gmail.com" });
        if (!admin) {
            return res.send({ error: "something went wrong" })
        }
        if (admin?.Password === password) {
            req.message = true
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