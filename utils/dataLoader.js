const fs = require('fs');
const path = require('path');

function loadTestData(filename) {
  const filePath = path.resolve(__dirname, '../data', filename);
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

module.exports = { loadTestData };
