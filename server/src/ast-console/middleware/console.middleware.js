import { db1 } from "../../db.js";

export const SigninMiddleware = async (req, res, next) => {
    const { admail, adpass } = req.body;
    try {
        const admin = await db1.collection('Hacthonadmin').findOne({ Gmail: admail });
        if (!admin) {
            return res.send({ error: "something went wrong" })
        }
        if (admin?.Password === adpass) {
            req.message = true
            next()
        }
        else {
            return res.send({ error: "something went wrong" })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signup' });
    }
}