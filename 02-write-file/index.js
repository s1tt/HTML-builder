const fs = require('fs');
const path = require('path');
const readline = require('readline');

const closeProgram = function () {
  console.log('Goodbye!');
  process.exit(0);
};

const writeFile = function (fileName) {
  const filePath = path.join(__dirname, fileName);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const fileStream = fs.createWriteStream(filePath, {flags: 'a'});

  const handleTypeText = function (input) {
    if (input === 'exit') {
      closeProgram();
    }

    fileStream.write(`${input}\n`);
    console.log(`You typed: ${input}`);
  };

  console.log('Welcome! Please type in some text (or type "exit" to quit):');

  rl.on('close', closeProgram);
  rl.on('line', input => handleTypeText(input));
};

writeFile('output.txt');