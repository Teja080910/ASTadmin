import { db } from "../db.js";
export const AttendStudent = async (req, res) => {
    try {
        const date = new Date()
        const { regd} = req.body
        let day;
        const user = await db.collection("Signup").findOne({ Reg_No: regd })
        if (user?.Login !== date.toDateString()) {
            if (user?.Num) {
                day = parseInt(user?.Num) + 1;
            } else {
                day = 1;
            }
            if (user?.Date) {
                if (user?.Date !== date.toDateString()) {
                    await db.collection('Attendance').findOneAndUpdate({ Date: day }, { $push: { Data: { Gmail: user?.Gmail } } })
                }
            }
            else {
                await db.collection('Attendance').insertOne({ Date: day, Data: [{ Gmail: user?.Gmail }] })
            }
            const attend = await db.collection("Signup").findOneAndUpdate({ Reg_No: regd }, { $set: { Login: date.toDateString(), Num: day } })
            if (attend?.value) {
                res.json({ message: "attend", data: attend })
            }
        } else{
            res.json({ error: "already attend" })
        }
    } catch (error) {
        console.log(error)
    }
}