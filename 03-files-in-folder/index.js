const checkFilesInFolder = function (folderName) {
  const fs = require('fs/promises');
  const path = require('path');

  fs.readdir(path.join(__dirname, folderName), {withFileTypes: true})
    .then(files => {
      files.forEach(file => {
        if (file.isFile()) {
          const fileName = path.parse(file.name).name;
          const fileExtension = path.parse(file.name).ext;
          fs.stat(path.join(__dirname, folderName, file.name))
            .then(stats => {
              const fileSize = stats.size;
              console.log(`${fileName} - ${fileExtension} - ${fileSize} bytes`);
            })
            .catch(err => console.error(err));
        }
      });
    })
    .catch(err => console.error(err));
};

checkFilesInFolder('secret-folder');