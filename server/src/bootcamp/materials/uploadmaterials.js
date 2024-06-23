import { bucket, db1 } from '../../db.js';
export const UploadFiles = async (files, theme, materialname, res) => {
    try {
        const uploadPromises = files.map(file => {
            const { originalname, buffer } = file;
            return new Promise((resolve, reject) => {
                const uploadStream = bucket.openUploadStream(originalname, {
                    metadata: { Theme:theme, Name:materialname }
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

        await Promise.all(uploadPromises)
            .then((result) => {
                if (result[0]?.files) {
                    res.json({ message: "upload files" })
                } else {
                    res.json({ error: "try again" })
                }
            })
            .catch((e) => console.log(e))
    } catch (error) {
        console.log(error)
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
    const downloadStream = bucket.openDownloadStreamByName(filename);
    downloadStream.on('error', (error) => {
        console.error(error);
        res.status(404).send('File not found');
    });
    downloadStream.pipe(res);
}