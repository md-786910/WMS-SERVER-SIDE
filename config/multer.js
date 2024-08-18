const multer = require('multer');
const { Readable } = require('stream');

// Set up multer for file uploads
const upload = multer();


module.exports = {
    upload,
}