import { db1 } from "../../db.js"
import { DeleteFile } from "./uploadmaterials.js"

export const DeletePhoto = async (theme, photo,pdf, res) => {
    try {
        const tasks = await db1.collection("Materials").findOne({ Theme: theme })
        if (tasks?.Theme) {
            const deletetask = await db1.collection("Materials").findOneAndUpdate({ Theme: theme }, { $pull: { Links: { Photoname: photo } } }) && 
            await DeleteFile(photo,pdf)
            if (deletetask) {
                res.json({message:"delete file"})
            } else {
                res.json({error:"question not found"})
            }
        } else {
            res.json({error:"Theme not found"})
        }
    } catch (error) {
        console.log(error)
    }
}

export const DeletePhotos = async (res) => {
    try {
        const deletetask = await db1.collection("Materials").deleteMany() && 
        await await db1.collection("uploads.files").deleteMany() && 
        await await db1.collection("uploads.chunks").deleteMany()
        if (deletetask) {
            res.json({message:"delete all"})
        }
    } catch (error) {
        console.log(error)
    }
}

export const DeleteTeamPhotos = async (res) => {
    try {
        const deletetask = await db1.collection("Materials").deleteMany() && 
        await await db1.collection("uploads.files").deleteMany() && 
        await await db1.collection("uploads.chunks").deleteMany()
        if (deletetask) {
            res.json({message:"delete all"})
        }
    } catch (error) {
        console.log(error)
    }
}