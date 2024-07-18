import { db2 } from "../../db.js";

export const ConsoleSignin = async (data) => {
    const { mail, password } = data.body;
    try {
        const admin = await db2.collection('Hacthonadmin').findOne({ Gmail: mail });
        if (!admin) {
            return{ error: 'admin not found' };
        }
        if (admin?.Password === password) {
            return admin
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signup' });
    }
}