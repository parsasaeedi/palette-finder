const express = require('express')
const multer = require('multer');
const app = express()
const port = 3001;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/api", upload.single('file'), (req, res) => {
    const file = req.file;
    console.log(file.originalname);
    const numClusters = req.body.numClusters
    console.log('File uploaded successfully!');
    console.log(req.body.numClusters);
    res.send('File uploaded successfully!');
})

app.listen(port, () => {console.log(`Server started on port ${port}`)})