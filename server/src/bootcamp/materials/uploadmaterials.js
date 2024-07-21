import mime from 'mime';
import { bucket, db1 } from '../../db.js';
import { Material } from './materials.js';
export const UploadFiles = async (files, theme, materialname, res) => {
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
            res.send({ error: 'files already exist', conflictingFiles });
            return;
        }

        const conflictingnames = [];
        await Promise.all(files.map(async file => {
            const { originalname } = file;
            const existfile = await db1.collection('uploads.files').findOne({ "metadata.Name": materialname });
            if (existfile?._id) {
                conflictingnames.push(originalname);
            }
        }));
        if (conflictingnames.length > 0) {
            res.send({ error: 'filename already exist', conflictingFiles });
            return;
        }

        const uploadPromises = files.map(async file => {
            const { originalname, buffer } = file;
            return new Promise((resolve, reject) => {
                const uploadStream = bucket.openUploadStream(originalname, {
                    metadata: { Theme: theme, Name: materialname }
                });
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
            await Material(
                results[0]?.options?.metadata?.Theme,
                results[0]?.options?.metadata?.Name,
                results[0]?.filename,
                results[1]?.filename,
                res
            );
        } else {
            res.status(400).json({ error: "Try again" });
        }
    } catch (error) {
        console.log(error);
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
        console.error(error);
        res.status(500).send('Error retrieving files');
    }
}

export const FileByName = (filename, res) => {
    try {
        const downloadStream = bucket.openDownloadStreamByName(filename);
        downloadStream.on('error', (error) => {
            res.status(404).send('File not found');
        });
        downloadStream.on('file', (file) => {
            const mimeType = mime.getType(file.filename);
            res.set('Content-Type', mimeType);
        });
        downloadStream.pipe(res);
    } catch (error) {

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
    } catch (error) {

    }
}