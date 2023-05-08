const fs = require('fs/promises');
const {copyDir} = require('../04-copy-directory');
const mergeFiles = require('../05-merge-styles');

//Создание папки project-dist:
async function createProjectDir() {
  try {
    await fs.mkdir('./06-build-page/project-dist');
  } catch (err) {
    if (err.code === 'EEXIST') {
    } else {
      console.error(err);
    }
  }
}


//Чтение файла-шаблона:
async function readTemplate() {
  const template = await fs.readFile('./06-build-page/template.html', 'utf-8');
  return template;
}

//Нахождение всех имён тегов в файле шаблона:
async function findTags(template) {
  const tagRegexp = /{{\s*([\w-]+)\s*}}/g;
  const tags = [];
  let match;
  while ((match = tagRegexp.exec(template))) {
    tags.push(match[1]);
  }
  return tags;
}

//Замена шаблонных тегов содержимым файлов-компонентов:
async function replaceTags(template, tags) {
  let result = template;
  for (const tag of tags) {
    const component = await fs.readFile(`./06-build-page/components/${tag}.html`, 'utf-8');
    result = result.replace(`{{${tag}}}`, component);
  }
  return result;
}

//Запись изменённого шаблона в файл index.html в папке project-dist:
async function saveResult(result) {
  await fs.writeFile('./06-build-page/project-dist/index.html', result);
}

//Объединение всех шагов в одну функцию:
async function buildPage() {
  await createProjectDir();
  const template = await readTemplate();
  const tags = await findTags(template);
  const result = await replaceTags(template, tags);
  await saveResult(result);
  //Использование скрипта написанного в задании 05-merge-styles для создания файла style.css:
  await mergeFiles('./06-build-page/styles', './06-build-page/project-dist', 'style.css', '.css');
  //Использование скрипта из задания 04-copy-directory для переноса папки assets в папку project-dist:
  await copyDir('./06-build-page/assets', './06-build-page/project-dist/assets')
    .catch((err) => console.error(`Error copying directory: ${err}`));
  await console.log('Done');
}

buildPage()
  .catch(err => console.log(err));




