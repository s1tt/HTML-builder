const path = require('path');
const fs = require('fs');

const mergeFiles = async function (startDir, distDir, outFilename, extFile) {

  const importantFileName = 'index.html';
  // Проверка наличия папки distDir и ее удаление, если она существует
  fs.stat(distDir, (err) => {
    if (!err) {
      deleteFiles(importantFileName);
      readAndWriteFiles()
        .catch(err => console.log(err));
    } else {
      createDistDir();
      readAndWriteFiles()
        .catch(err => console.log(err));
    }
  });

  //delFiles
  const deleteFiles = function(importantFileName) {
    fs.readdir(distDir, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      // Удаляем все файлы, кроме нужного
      const filesToDelete = files.filter((file) => file !== importantFileName);
      filesToDelete.forEach((file) => {
        const filePath = path.join(distDir, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            return;
          }
        });
      });
    });
  };

  //Создаем директорию
  function createDistDir() {
    fs.mkdir(distDir, {recursive: true}, (err) => {
      if (err) throw err;
      console.log(`Директория "${distDir}" создана`);
    });
  }

  async function readAndWriteFiles() {
    const inputFiles = await fs.promises.readdir(startDir);
    const filteredFiles = inputFiles.filter(file => file.endsWith(extFile));

    const finalPath = path.join(distDir, outFilename);
    const writeStream = fs.createWriteStream(finalPath);

    for (const file of filteredFiles) {
      const filePath = path.join(startDir, file);
      const data = await fs.promises.readFile(filePath, 'utf-8');
      writeStream.write(data);
    }
    writeStream.end();
  }
};


mergeFiles('./05-merge-styles/styles', './05-merge-styles/project-dist', 'bundle.css', '.css');
module.exports = mergeFiles;
