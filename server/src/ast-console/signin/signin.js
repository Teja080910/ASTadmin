import { db1 } from "../../db.js";

export const ConsoleSignin = async (data, res) => {
    const { mail, password } = data.body;
    try {
        const admin = await db1.collection('Hacthonadmin').findOne({ Gmail: mail });
        if (!admin) {
            return res.json({ error: 'admin not found' });
        }
        if (admin?.Password === password) {
            const admin = await db1.collection('Hacthonadmin').findOne({ Gmail: "hackathon@gmail.com" });
            return res.json({ message: 'login successfully', data: admin,routes:admin?.Routes})
        }
        else {
            res.json({ error: 'incorrect password' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signup' });
    }
}