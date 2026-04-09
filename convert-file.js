const fs = require("fs");
const path = require("path");
const { convertToCSV } = require("./services/convert");

async function main() {
  const inputArg = process.argv[2];
  if (!inputArg) {
    console.error("Usage: node convert-file.js <input-file>");
    process.exit(1);
  }

  const inputPath = path.resolve(process.cwd(), inputArg);
  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const baseName = path.parse(inputPath).name;
  const outputDir = path.join(process.cwd(), "output");
  const outputPath = path.join(outputDir, `${baseName}.csv`);

  fs.mkdirSync(outputDir, { recursive: true });

  try {
    await convertToCSV(inputPath, outputPath);
    console.log(`Converted file saved to ${outputPath}`);
  } catch (error) {
    console.error("Conversion failed:", error);
    process.exit(1);
  }
}

main();
