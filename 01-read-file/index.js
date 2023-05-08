const readFile = function (fileName) {
  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(__dirname, fileName);
  const readStream = fs.createReadStream(filePath);

  readStream.pipe(process.stdout);
};

readFile('text.txt');
