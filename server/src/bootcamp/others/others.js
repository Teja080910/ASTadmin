import { db1 } from '../../db.js';
export const InternalMarks = async (reg, mark, res) => {
    try {
        let marks;
        const user = await db1.collection("Hackathondata").findOne({ Reg_No: reg })
        if (user?._id) {
            marks = parseInt(mark) + parseInt(user?.InternalMarks || 0)
            const attend = await db1.collection("Hackathondata").findOneAndUpdate({ Reg_No: reg }, { $set: { InternalMarks: marks } })
            if (attend?.value) {
                res.json({ message: "update", data: attend })
            } else {
                res.send({ error: 'try again' })
            }
        } else {
            res.send({ error: "user not found" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const ActivityMarks = async (reg, mark, res) => {
    try {
        let marks;
        const user = await db1.collection("Hackathondata").findOne({ Reg_No: reg })
        if (user?._id) {
            marks = parseInt(mark) + parseInt(user?.ActivityMarks || 0)
            const attend = await db1.collection("Hackathondata").findOneAndUpdate({ Reg_No: reg }, { $set: { ActivityMarks: marks } })
            if (attend?.value) {
                res.json({ message: "update", data: attend })
            } else {
                res.send({ error: 'try again' })
            }
        } else {
            res.send({ error: "user not found" })
        }
    } catch (error) {
        console.log(error)
    }
}