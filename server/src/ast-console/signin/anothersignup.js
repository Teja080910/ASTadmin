import { db1, db2 } from "../../db.js";
export const ConsoleAnotherRegister = async (data, res) => {
    const { mail, password, phone, event, adminmail } = data;
    try {
        const admin = await db2.collection('Hacthonadmin').findOne({ Gmail: adminmail });
        if (!admin) {
            return res.json({ error: 'admin not found' });
        }
        else {
            if (admin?.Admins?.length <= admin?.NoOfAdmins) {
                const subadmin = await db2.collection('Hacthonadmin').findOne({ Gmail: mail });
                if (subadmin) {
                    return res.json({ error: 'exist admin' });
                }
                await db1.collection('Hacthonadmin').insertOne({ Gmail: mail, Event: event, Number: phone, Password: password, Admin: false })
                    .then(async (details) => {
                        if (details) {
                            await db2.collection("Hacthonadmin").findOneAndUpdate({ Gmail: adminmail }, { $set: { Admins: [...admin?.Admins, mail] } })
                                .then((result) => {
                                    if (result) {
                                        res.json({ message: "sucess", data: details });
                                    }
                                })
                                .catch((e) => console.log(e))
                        }
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