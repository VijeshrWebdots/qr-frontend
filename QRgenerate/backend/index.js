

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const vcard = require('vcards-js');
require('dotenv').config();
const AWS = require('aws-sdk'); // Include AWS SDK

// Middleware to parse JSON body
app.use(bodyParser.json());

// Allow all origins
app.use(cors());

const database = [];

// Hardcoded admin credentials
const adminEmail = 'webdotsadminonlycanaccess@gmail.com';
const adminPassword = 'vIWNPZcJZNDYIaKINBhMQdxUDG8p';

// Configure AWS credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

console.log(process.env.AWS_ACCESS_KEY_ID)
console.log(process.env.AWS_SECRET_ACCESS_KEY)
console.log(process.env.AWS_REGION)
const s3 = new AWS.S3();

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the provided credentials match the admin credentials
    if (username === adminEmail && password === adminPassword) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
});

app.post('/api/vscardgenerate', (req, res) => {
    const formData = req.body;

    const mycard = vcard();

    mycard.firstName = formData.fname;
    mycard.lastName = formData.lname;
    mycard.workEmail = formData.email;
    mycard.workPhone = formData.phone;
    mycard.organization = formData.organisation;
    mycard.title = formData.title;

    // Generate unique filename
    const fileName = `${formData.fname}_${formData.lname}.vcf`;

    // Create vCard data
    const vCardData = mycard.getFormattedString();

    // Upload vCard data to S3
    const params = {
        Bucket: 'qrcodevcf',
        Key: fileName,
        Body: vCardData,
        ContentType: 'text/vcard'
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error('Error uploading file to S3:', err);
            res.status(500).json({ success: false, message: 'Error uploading file to S3' });
        } else {
            console.log('File uploaded successfully to S3:', data.Location);
            // Send the S3 object URL in the response
            res.json({ success: true, message: 'File uploaded successfully to S3', fileUrl: data.Location });
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
