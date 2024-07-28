import { db1 } from "../../db.js";

export const AttendStudent = async (reg, res) => {
    const date = new Date()
    let day;
    try {
        const user = await db1.collection("Hackathondata").findOne({ Reg_No: reg })
        if (user?.Date !== date.toDateString()) {
            if (user?.AttendDays) {
                day = parseInt(user?.AttendDays) + 1;
            } else {
                day = 1;
            }
            const attend = await db1.collection("Hackathondata").findOneAndUpdate({Reg_No: user?.Reg_No}, { $set: { Date: date.toDateString(), AttendDays: day, AttendTime: user?.AttendTime ? [...user?.AttendTime, date] : [date] } })
            if (attend?.value) {
                res.json({ message: "attend", data: attend })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const AbsentStudent = async (reg, res) => {
    const date = new Date()
    let day;
    try {
        const user = await db1.collection("Hackathondata").findOne({Reg_No: reg})
        if (user?.Date === date.toDateString()) {
            if (user?.AttendDays) {
                day = parseInt(user?.AttendDays) - 1;
            } else {
                day = 1;
            }
            const attend = await db1.collection("Hackathondata").findOneAndUpdate({Reg_No: user?.Reg_No}, { $set: { Date: " ", AttendDays: day } })
            if (attend?.value) {
                res.json({ message: "absent", data: attend })
            }
        }
    } catch (error) {
        console.log(error)
    }
}
