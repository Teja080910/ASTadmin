import { bucket, db1 } from "../../db.js"
import { DeleteFile } from "./uploadphoto.js"

export const DeletePhoto = async (photo, teamname, res) => {
    try {
        const tasks = await db1.collection("Teams").findOne({ TeamCode: parseInt(teamname) })
        if (tasks?.Team) {
            await DeleteFile(photo)
            const deletetask = await db1.collection("Teams").findOneAndUpdate({ TeamCode: parseInt(teamname) }, { $pull: { Photos: photo } })
            if (deletetask) {
                res.json({ message: "delete photo" })
            } else {
                res.json({ error: "usert not found" })
            }
        } else {
            res.json({ error: "student not found" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const DeleteTeamPhotos = async (data, res) => {
    try {
        const teamCode = parseInt(data);
        const team = await db1.collection("Teams").findOne({ TeamCode: teamCode });
        if (!team?._id) {
            return res.status(404).send({ error: 'Team not found' });
        }
        await db1.collection("Teams").findOneAndUpdate({ TeamCode: teamCode },{ $unset: { Photos:null } });
        const files = await db1.collection('uploads.files').find({ filename: { $in: team.Photos } }).toArray();
        if (files.length > 0) {
            const fileIds = files.map(file => file._id);
            await db1.collection('uploads.files').deleteMany({ _id: { $in: fileIds } });
            await db1.collection('uploads.chunks').deleteMany({ files_id: { $in: fileIds } });
            res.json({ message: "All photos deleted successfully" });
        } else {
            res.status(404).send({ error: 'No files found for the given photos' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

