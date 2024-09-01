const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const folderPath = path.join(__dirname, 'files');

const cors = require('cors');
app.use(cors());

// Ensure the folder exists
fs.ensureDirSync("./files");

// Middleware
app.use(express.json());

// Endpoint to create a text file with the current timestamp
app.post('/create-file', async (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    const filename = `${new Date().toISOString().replace(/:/g, '-')}.txt`;
    const filePath = path.join(folderPath, filename);
    await fs.writeFile(filePath, timestamp);
    res.status(201).json({ message: 'File created', filename });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to retrieve all text files
app.get('/files', async (req, res) => {
  try {
    const files = await fs.readdir("./files");
    const textFiles = files.filter(file => file.endsWith('.txt'));
    res.status(200).json({ files: textFiles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at https://session-37.onrender.com/${port}`);
});
