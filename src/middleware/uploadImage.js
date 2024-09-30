const multer = require('multer');
const path = require('path');

function replaceWhitespaceWithDash(str) {
    return str.replace(/\s+/g, '-');
}


const MAX_SIZE = 5 * 1024 * 1024; // 5mb
const storageImage = multer.diskStorage({
    destination: async function (req, file, cb) {
        if (file.fieldname === 'mainImage') {
            cb(null, 'src/uploads/mainImage');
        }
        if (file.fieldname === 'productImage') {
            cb(null, 'src/uploads/productImage');
        }
        if (file.fieldname === 'reviewImage') {
            cb(null, 'src/uploads/reviewImage');
        }
    },
    filename: function (req, file, cb) {
        const { nameProduct } = req.body
        const nameFile = replaceWhitespaceWithDash(nameProduct.trim())
        cb(null, nameFile + '-' + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        let size = +req.rawHeaders.slice(-1)[0];

        if (size >= MAX_SIZE) {
            let error = [
                {
                    param: file.fieldname,
                    msg: 'file_too_large',
                },
            ];
            cb(null, false);
        } else {
            cb(null, true);
        }
    } else {
        let error = [
            {
                param: file.fieldname,
                msg: 'invalid_file_type',
            },
        ];
        cb(null, false);
    }
};

const uploadImage = multer({
    limits: { fileSize: MAX_SIZE },
    fileFilter: fileFilter,
    storage: storageImage,
});

module.exports = { uploadImage };
