const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const vcard = require('vcards-js');
const path = require('path'); 

// Middleware to parse JSON body
app.use(bodyParser.json());

// Allow all origins
app.use(cors());

const database = [];

// Hardcoded admin credentials
const adminEmail = 'webdotsadminonlycanaccess@gmail.com';
const adminPassword = 'vIWNPZcJZNDYIaKINBhMQdxUDG8p';

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

    // Add form data to the database
    database.push(formData);

    const mycard = vcard();

    mycard.firstName = formData.fname;
    mycard.lastName = formData.lname;
    mycard.workEmail = formData.email;
    mycard.workPhone = formData.phone;
    mycard.organization = formData.organisation;
    mycard.title = formData.title;

    // Generate unique filename
    const fileName = `${formData.fname}_${formData.lname}.vcf`;

    // Get the parent directory of the current directory
    const parentDirectory = path.join(__dirname, '../../');

    // Set the path to store the vCard file
    const filePath = path.join(parentDirectory, fileName);

    // Save vCard to file
    mycard.saveToFile(filePath);
    
    // Respond with file path
    res.json({ filePath: filePath });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
