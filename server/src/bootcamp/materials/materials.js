import { db1 } from "../../db.js"

export const Material = async (theme, name, photoname, pdfname, res) => {
    try {
        const tasks = await db1.collection("Materials").findOne({ Theme: theme })
        if (tasks?.Theme) {
            await db1.collection("Materials").findOneAndUpdate({ Theme: theme }, { $push: { Links: { Name: name, Photoname: photoname, Pdfname: pdfname } } })
                .then((insert) => {
                    if (insert?.value?._id) {
                        res.json({ message: "upload files" })
                    }
                }).catch((e) => {
                    console.log(e)
                })
        }
        else {
            const insert = await db1.collection("Materials").insertOne({ Theme: theme, Links: [{ Name: name, Photoname: photoname, Pdfname: pdfname }] })
            if (insert?.insertedId) {
                res.json({ message: "upload files" })
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const Materials = async (res) => {
    try {
        const tasks = await db1.collection("Materials").find().toArray()
        if (tasks.length > 0) {
            res.json(tasks)
        }
    } catch (error) {
        console.log(error)
    }
}