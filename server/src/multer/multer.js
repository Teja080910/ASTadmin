import multer from 'multer';
export const initiateMulter = () => {
    return  async(req, res, next) => {
        const storage = multer.memoryStorage();
        const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } });
        const uploadFn = upload.any();
        uploadFn(req, res, function (err) {
            if (err) {
                console.error(err);
                return next(err);
            }
            next();
        });
    };
};