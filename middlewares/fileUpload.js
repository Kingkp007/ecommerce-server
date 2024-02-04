const express = require('express')
const path = require('path')
const app = express()
app.use(express.json());
const cors = require("cors");
app.use(cors());
const multer = require("multer");
const fs = require('fs')

const uploadFolder = path.join(__dirname, '..', 'uploads');

// Create the destination folder if it doesn't exist
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // const destinationPath = path.join(__dirname, "files");
        console.log("Destination Path:", uploadFolder);
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now();
        cb(null,  file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload ;