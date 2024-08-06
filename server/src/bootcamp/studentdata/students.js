import { db1 } from "../../db.js"

export const Students = async (res) => {
    try {
        const students = await db1.collection("Hackathondata").find().toArray()
        if (students.length>0) {
            res.send(students)
        }
    } catch (error) {
        console.log(error)
    }
}

export const DeleteAll = async (res) => {
    try {
        const students = await db1.collection("Hackathondata").deleteMany()
        if (students) {
            res.json(students)
        }
    } catch (error) {
        console.log(error)
    }
}