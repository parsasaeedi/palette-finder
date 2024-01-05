const generatePalette = require("./generatePalette.js");
const express = require('express')
const multer = require('multer');

const app = express()
const port = 3001;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api", upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const numClusters = req.body.numClusters
        console.log('File uploaded successfully!');
        const palette = await generatePalette(file.buffer, numClusters);
        const data = {
            palette: palette,
        }
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

app.listen(port, () => {console.log(`Server started on port ${port}`)})