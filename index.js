const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const cors = require('cors');
const { format } = require('date-fns');
const { formatInTimeZone } = require('date-fns-tz');

const app = express();
const port = process.env.PORT || 3000;
const folderPath = path.join(__dirname, 'files');

// Ensure the folder exists
fs.ensureDirSync(folderPath);

// Middleware
app.use(cors());
app.use(express.json());

const timeZone = 'Asia/Kolkata';

// Endpoint to create a text file with the current timestamp in IST
app.post('/create-file', async (req, res) => {
  try {
    // Get the current date and time in IST
    const now = new Date();
    const formattedFilenameDate = formatInTimeZone(now, timeZone, 'yyyy-MM-dd HH-mm-ss');
    const formattedContentDate = formatInTimeZone(now, timeZone, 'yyyy-MM-dd HH:mm:ss');

    // Create the filename with the human-readable format
    const filename = `${formattedFilenameDate}.txt`;
    const filePath = path.join(folderPath, filename);

    // Write the human-readable timestamp to the file
    await fs.writeFile(filePath, formattedContentDate);

    res.status(201).json({ message: 'File created', filename });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to retrieve all text files
app.get('/files', async (req, res) => {
  try {
    const files = await fs.readdir(folderPath);
    const textFiles = files.filter(file => file.endsWith('.txt'));
    res.status(200).json({ files: textFiles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
