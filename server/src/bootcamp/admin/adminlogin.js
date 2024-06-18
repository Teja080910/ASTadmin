import { db1 } from "../../db.js";
export const AdminLogin = async (data, res) => {
    const { email, password } = data;
    try {
        const admin = await db1.collection('Hacthonadmin').findOne({ Gmail: email });
        if (!admin) {
            return res.json({ error: 'Invalid admin' });
        }
        if (admin?.Password === password) {
            return res.json({ message: "admin login sucessfully", data: admin })
        }
        else {
            return res.json({ error: "incorrect password", data: admin })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signin' });
    }
}