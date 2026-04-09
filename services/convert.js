const fs = require("fs");
const readline = require("readline");

async function convertToCSV(input, output) {
  const rl = readline.createInterface({
    input: fs.createReadStream(input),
  });

  const writer = fs.createWriteStream(output);

  for await (const line of rl) {
    writer.write(line.replace(/\t/g, ",") + "\n");
  }

  writer.end();
}

module.exports = { convertToCSV };