const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
const singleFileUpload = (fieldName) => upload.single(fieldName);
const multipleFileUpload = (fieldName) => upload.array(fieldName);
const mixedFileUpload = (fields) => upload.fields(fields);

module.exports = {
    singleFileUpload,
    multipleFileUpload,
    mixedFileUpload,
};
