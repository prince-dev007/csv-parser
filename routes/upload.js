const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const { convertToCSV } = require("../services/convert");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const inputFile = req.file.path;
    const baseName = path.parse(req.file.originalname).name;
    const outputDir = path.join(__dirname, "../output");
    const csvPath = path.join(outputDir, `${baseName}.csv`);

    fs.mkdirSync(outputDir, { recursive: true });

    await convertToCSV(inputFile, csvPath);

    res.download(csvPath, `${baseName}.csv`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Download failed");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Processing failed");
  }
});

module.exports = router;
