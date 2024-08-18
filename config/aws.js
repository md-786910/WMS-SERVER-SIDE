const { region, accessKeyId, secretAccessKey, bucket_name } = require('../constants/config');

const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// Set up AWS credentials
const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});
const uploadFilesToS3 = async (files) => {
    try {
        const uploadPromises = files.map(async (file) => {
            const key = file.name + new Date().getTime();
            const uploadParams = {
                Bucket: bucket_name,
                Key: key,
                Body: file.content, // Assuming `file.content` is the file buffer or stream
                ContentType: file.type, // Optional: MIME type
            };

            const command = new PutObjectCommand(uploadParams);
            await s3Client.send(command);
            const fileUrl = `https://${bucket_name}.s3.amazonaws.com/${key}`
            let responseData = {
                originalName: file.name,
                url: fileUrl,
                type: file.type,
                key: key,
            }
            return responseData;
        });

        const results = await Promise.all(uploadPromises);
        return results;
    } catch (err) {
        console.error('Error uploading files:', err);
        throw err;
    }
};

const deleteFilesFromS3 = async (key) => {
    try {
        const uploadParams = {
            Bucket: bucket_name,
            Key: key,

        };
        const command = new DeleteObjectCommand(uploadParams)
        const resp = await s3Client.send(command);
        return true;
    } catch (error) {
        console.error(`Error deleting file from S3:`, error);
        return false
    }
}

module.exports = {
    s3Client, uploadFilesToS3, deleteFilesFromS3
}


// Define a route to handle file uploads
// app.post('/upload', upload.single('file'), async (req, res) => {
//   const fileStream = Readable.from(req.file.buffer);

//   const params = {
//     Bucket: 'YOUR_S3_BUCKET_NAME',
//     Key: req.file.originalname,
//     Body: fileStream,
//   };

//   try {
//     await s3Client.send(new PutObjectCommand(params));
//     console.log('File uploaded successfully');
//     res.status(200).send('File uploaded');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Failed to upload file');
//   }
// });

