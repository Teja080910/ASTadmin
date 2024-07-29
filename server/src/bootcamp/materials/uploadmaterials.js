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
        const filenames = [photo, pdf];
        const files = await db1.collection('uploads.files').find({ filename: { $in: filenames } }).toArray();
        if (files.length > 0) {
            const fileIds = files.map(file => file._id);
            await db1.collection('uploads.chunks').deleteMany({ files_id: { $in: fileIds } });
            for (const fileId of fileIds) {
                await bucket.delete(fileId);
            }
        }
    } catch (error) {
        console.error("Error deleting files:", error);
    }
};

export const Chunks = async () => {
    // const unmatchedFiles = await db1.collection("uploads.chunks").aggregate([
    //     {
    //         $lookup: {
    //             from: "upload.chunks",
    //             localField: "files_id",
    //             foreignField: "_id",
    //             as: "chunks"
    //         }
    //     },
    //     {
    //         $match: {
    //             "chunks": { $size: 0 }
    //         }
    //     },
    //     {
    //         $project: {
    //             _id: 1
    //         }
    //     }
    // ]).toArray();

    // const unmatchedFileIds = unmatchedFiles.map(file => file._id);

    // console.log(unmatchedFileIds)

    // // if (unmatchedFileIds.length > 0) {
    // //     const result = await db.collection("upload.files").deleteMany({ _id: { $in: unmatchedFileIds } });
    // //     console.log(`${result.deletedCount} files were deleted.`);
    // // } else {
    // //     console.log('No unmatched files found.');
    // // }

    const filesCollection = db1.collection('uploads.files');
    const chunksCollection = db1.collection('uploads.chunks');
    const files = await filesCollection.find().toArray();
    const fileIds = files.map(file => file._id);
    const chunks = await chunksCollection.find().toArray();
    const chunkIds = chunks.map(chunk => chunk.files_id);
    const idsToDelete = chunkIds.filter(fileId => fileIds.includes(fileId));
    if (idsToDelete.length > 0) {
      const result = await chunksCollection.deleteMany({ files_id: { $in: idsToDelete } });
      console.log(`${result.deletedCount} chunk(s) deleted`);
    } else {
      console.log('No chunks to delete');
    }

}