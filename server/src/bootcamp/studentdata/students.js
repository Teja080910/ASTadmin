import { db1 } from "../../db.js"

export const Students = async (res) => {
    try {
        const students = await db1.collection("Hackathondata").find().toArray()
        if (students.length > 0) {
            res.send(students)
        }
    } catch (error) {
        console.log(error)
    }
}

export const StudentsNames = async (res) => {
    try {
        let students = []
        const student = await db1.collection("Hackathondata").find().toArray()
        student?.map((val) => (
            students.push({ Name: val?.Name, Reg_No: val?.Reg_No })
        ))
        if (students.length > 0) {
            res.send(students)
        }
    } catch (error) {
        console.log(error)
    }
}

export const Student = async (reg, res) => {
    try {
        const student = await db1.collection("Hackathondata").findOne({ Reg_No: reg })
        if (student?._id) {
            res.send(student)
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