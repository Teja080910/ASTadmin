import multer from 'multer';
export const initiateMulter = (resize = true) => {
    return async (req, res, next) => {
        const storage = multer.memoryStorage();
        const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });
        const uploadFn = upload.any();
        uploadFn(req, res, async function (err) {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (resize && req.files && req.files.length > 0) {
                for (const file of req.files) {
                    if (file.mimetype.includes("image") && file.size > 1024) {
                        try {
                            file.buffer = await sharp(file.buffer)
                                .resize(1024, null, { fit: 'contain' })
                                .toBuffer();
                        } catch (resizeErr) {
                            console.error(resizeErr);
                            return next(resizeErr);
                        }
                    }
                }
            }
            next();
        });
    };
};