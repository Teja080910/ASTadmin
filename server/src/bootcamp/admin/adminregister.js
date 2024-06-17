import { db1 } from "../../db.js";
export const AdminRegister = async (data, res) => {
    const { email, password, name, phone } = data;
    try {
        const admin = await db1.collection('Hacthonadmin').findOne({ Gmail: email });
        if (admin) {
            return res.json({ error: 'exist admin' });
        }
        else {
            const admins = await db1.collection('Hacthonadmin').find().toArray()
            if (admins.length <= 2) {
                await db1.collection('Hacthonadmin').insertOne({ Gmail: email, Name: name, Number: phone, Password: password })
                    .then((details) => {
                        res.json({ message: "sucess", data: details });
                    })
                    .catch((e) => console.log(e))
            } else {
                return res.json({ error: 'admins limit over' });
            }
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signup' });
    }
}