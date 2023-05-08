const fs = require('fs/promises');
const path = require('path');

async function copyDir(srcDir, destDir) {
  try {
    // создаем папку destDir
    await fs.mkdir(destDir, {recursive: true});

    // читаем содержимое папки srcDir
    const files = await fs.readdir(srcDir);

    // рекурсивно копируем содержимое каждого файла/папки из srcDir в destDir
    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);

      const stat = await fs.stat(srcPath);
      if (stat.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error(`Error copying directory: ${err}`);
  }
}

copyDir('./04-copy-directory/files', './04-copy-directory/files-copy')
  .catch((err) => console.error(`Error copying directory: ${err}`));
exports.copyDir = copyDir;
