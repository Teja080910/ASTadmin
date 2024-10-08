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
            const attend = await db1.collection("Hackathondata").findOneAndUpdate({ Reg_No: user?.Reg_No }, { $set: { Date: date.toDateString(), AttendDays: day, AttendTime: user?.AttendTime ? [...user?.AttendTime, date] : [date] } })
            if (attend?.value) {
                res.send({ message: "attend", data: attend })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

export const AbsentStudent = async (reg, res) => {
    const date = new Date()
    let day;
    try {
        const user = await db1.collection("Hackathondata").findOne({ Reg_No: reg })
        if (user?.Date === date.toDateString()) {
            if (user?.AttendDays) {
                day = parseInt(user?.AttendDays) - 1;
            } else {
                day = 1;
            }
            const attend = await db1.collection("Hackathondata").findOneAndUpdate({ Reg_No: user?.Reg_No }, { $set: { Date: " ", AttendDays: day } })
            if (attend?.value) {
                res.json({ message: "absent", data: attend })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}


export const StudentsAttendance = async (res) => {
    try {
        let students = []
        const student = await db1.collection("Hackathondata").find().toArray()
        student?.map((val) => (
            students.push({ Name: val?.Name, Reg_No: val?.Reg_No,Date:val?.Date,Year:val?.Year,Number:val?.Number})
        ))
        if (students.length > 0) {
            res.send(students)
        }
    } catch (error) {
        console.log(error)
    }
}