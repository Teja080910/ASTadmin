import { db2 } from "../../db.js";
export const ConsoleRegister = async (data, res) => {
    const { mail, password, phone, event, club, date, members } = data;
    try {
        const admin = await db2.collection('Hacthonadmin').findOne({ Gmail: mail });
        if (admin) {
            return res.json({ error: 'exist admin' });
        }
        else {
            if (admin?.Admins?.length <= admin?.NoOfAdmins) {
                await db2.collection('Hacthonadmin').insertOne({ Gmail: mail, Event: event, Number: phone, Password: password, Club: club, Date: date, NoOfAdmins: members, Admin:true,Admins: [...admin?.Admins, mail] })
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