import { db2 } from "../../db.js";

export const ConsoleSignin = async (data) => {
    const { mail, password } = data;
    try {
        const admin = await db2.collection('Hacthonadmin').findOne({ Gmail: mail });
        if (!admin) {
            return res.json({ error: 'admin not found' });
        }
        if (admin?.Password === password) {
            return admin?.Club + admin?.Event
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signup' });
    }
}