import { db1 } from "../../db.js";
export const AdminLogin = async (data, res) => {
    const { mail, password } = data;
    const date = new Date().toDateString();
    try {
        const admin = await db1.collection('Hackathonadmin').findOne({ Gmail: mail });
        if (!admin) {
            return res.json({ error: 'Invalid admin' });
        }
        if (admin?.Password === password) {
            if (admin?.Date !== date) {
                const count = parseInt(admin?.Count || 0) + 1
                const adminupdate = await db1.collection('Hackathonadmin').findOneAndUpdate({ Gmail: mail }, { $set: { Date: date, Count: count } });
                if (adminupdate?.value?.Gmail) {
                    return res.json({ message: "admin login sucessfully", data: admin })
                }
            }
            if (admin?.Date === date) {
                return res.json({ message: "admin login sucessfully", data: admin })
            }
        }
        else {
            return res.json({ error: "incorrect password", data: admin })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signin' });
    }
}