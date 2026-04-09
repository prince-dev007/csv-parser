const express = require("express");
const multer = require("multer");
const path = require("path");

const { decryptFile } = require("../services/decrypt");
const { convertToCSV } = require("../services/convert");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const inputFile = req.file.path;
    const baseName = path.parse(req.file.originalname).name;
    console.log(`Received file: ${inputFile}`);
    console.log(`baseName file: ${baseName}`);

    // const decryptedPath = `output/${baseName}.txt`;
    // const csvPath = `output/${baseName}.csv`;

    // // Step 1: Decrypt
    // // await decryptFile(inputFile, decryptedPath);

    // // Step 2: Convert
    // await convertToCSV(decryptedPath, csvPath);

    // // Step 3: Send CSV
    // res.download(csvPath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Processing failed");
  }
});

module.exports = router;
