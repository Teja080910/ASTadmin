import { db1 } from "../../db.js"

export const InsertPhoto = async (photoname, teamname, res) => {
    try {
        const tasks = await db1.collection("Teams").findOne({ TeamCode: parseInt(teamname) })
        if (tasks?.Team) {
            const photos = [];
            await Promise.all(photoname?.map(async (photo) => (
                await db1.collection("Teams").findOneAndUpdate({ TeamCode: parseInt(teamname) }, { $push: { Photos: photo?.filename } })
                    .then((insert) => {
                        if (insert?.value?._id) {
                            photos.push(insert)
                        }
                    }).catch((e) => {
                        reject(e)
                    })
            )))

            if (photos.length === photoname.length) {
                res.json({ message: "upload files" })
            }
        }
        else {
            res.json({ error: "team not found" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const Photos = async (res) => {
    try {
        const tasks = await db1.collection("Teams").find().toArray()
        if (tasks.length > 0) {
            res.json(tasks)
        }
    } catch (error) {
        console.log(error)
    }
}