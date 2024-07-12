import { db1 } from '../../db.js';
export const HackInternalMarks = async (code, mark, res) => {
    try {
        let marks;
        const user = await db1.collection("Teams").findOne({ TeamCode: parseInt(code) })
        if (user?._id) {
            marks = parseInt(mark) + parseInt(user?.HackInternalMarks || 0)
            const attend = await db1.collection("Teams").findOneAndUpdate({ TeamCode: parseInt(code) }, { $set: { HackInternalMarks: marks } })
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

export const HackActivityMarks = async (code, mark, res) => {
    try {
        let marks;
        const user = await db1.collection("Teams").findOne({ TeamCode: parseInt(code) })
        if (user?._id) {
            marks = parseInt(mark) + parseInt(user?.HackActivityMarks || 0)
            const attend = await db1.collection("Teams").findOneAndUpdate({ TeamCode: parseInt(code) }, { $set: { HackActivityMarks: marks } })
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