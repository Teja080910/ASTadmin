import { bucket, db1 } from '../../db.js';
export const UploadFiles = (file, res) => {
    try {
        const { originalname, buffer } = file;
        const uploadStream = bucket.openUploadStream(originalname);
        uploadStream.end(buffer);
        uploadStream.on('finish', () => {
            res.status(200).send('File uploaded successfully');
        });
        uploadStream.on('error', (error) => {
            res.status(500).send('Error uploading file');
        });
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