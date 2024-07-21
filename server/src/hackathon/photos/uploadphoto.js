import { bucket, db1 } from '../../db.js';
import { InsertPhoto } from './photo.js';
export const UploadPhotos = async (files, teamname, res) => {
    try {
        const conflictingFiles = [];
        await Promise.all(files.map(async file => {
            const { originalname } = file;
            const existfile = await db1.collection('uploads.files').findOne({ filename: originalname });
            if (existfile?._id) {
                conflictingFiles.push(originalname);
            }
        }));
        if (conflictingFiles.length > 0) {
            res.send({ error: 'files already exist', data: conflictingFiles });
            return;
        }
        const uploadPromises = files.map(async file => {
            const { originalname, buffer } = file;
            return new Promise((resolve, reject) => {
                const uploadStream = bucket.openUploadStream(originalname, { metadata: { TeamName: teamname } });
                uploadStream.end(buffer);
                uploadStream.on('finish', () => {
                    resolve(uploadStream);
                });
                uploadStream.on('error', (error) => {
                    reject(error);
                });
            });
        });
        const results = await Promise.all(uploadPromises);
        if (results.every(result => result?.bufToStore)) {
            await InsertPhoto(results, teamname, res);
        } else {
            res.status(400).json({ error: "Try again" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const RetriveFiles = async (res) => {
    try {
        const files = await db1.collection('uploads.files').find().toArray();
        if (!files || files.length === 0) {
            return res.status(404).send('No files found');
        }
        res.status(200).json(files);
    } catch (error) {
        res.status(500).send('Error retrieving files');
    }
}

export const DeleteFile = async (photo, pdf) => {
    try {
        const filenames = [photo, pdf]
        const files = await db1.collection('uploads.files').find({ filename: { $in: filenames } }).toArray();
        if (files.length > 0) {
            for (const file of files) {
                const fileId = file._id;
                await bucket.delete(fileId)
            }
        }
        return files
    } catch (error) {}
}