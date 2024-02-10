import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';

const toTitleCase = (s: string) =>
  s.charAt(0).toUpperCase() +
  s.slice(1).replace(/\W+(.)/g, (_, chr) => ` ${chr.toUpperCase()}`);

const toCamelCase = (s: string) =>
  s.charAt(0).toLowerCase() +
  s.slice(1).replace(/\W+(.)/g, (_, chr) => chr.toUpperCase());

const toKebabCase = (s: string) => s.toLowerCase().replace(/\W/g, '-');

interface CopyFilesParams {
  srcDir: string;
  destDir: string;
  name: string;
  camelCaseName: string;
  typeName: string;
}

const copyFiles = ({
  srcDir,
  destDir,
  name,
  camelCaseName,
  typeName,
}: CopyFilesParams) => {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }

  const templateFiles = fs.readdirSync(srcDir);
  templateFiles.forEach((file) => {
    const srcPath = path.resolve(srcDir, file);
    const destPath = path.resolve(destDir, file);

    const fileContents = fs
      .readFileSync(srcPath, 'utf-8')
      .split('\n')
      .filter((line) => !line.includes('@ts-nocheck'))
      .join('\n')
      .replace(/xxx/g, camelCaseName)
      .replace(/XXX/g, typeName)
      .replace(/\[\[name\]\]/g, name);

    fs.writeFileSync(destPath, fileContents);
  });
};

const run = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Choose a name for the generator:',
      validate: (value) => !!value && !!value.length,
    },
    {
      type: 'input',
      name: 'urlPath',
      message: 'Choose a path for the url for the generator:',
      default: ({ name }: { name: string }) => toKebabCase(name),
    },
    {
      type: 'input',
      name: 'camelCaseName',
      message: 'How should this generator be named in camelCase?',
      default: ({ name }: { name: string }) => toCamelCase(name),
    },
    {
      type: 'input',
      name: 'typeName',
      message: 'How should this generator be named as a typescript type?',
      default: ({ camelCaseName }: { camelCaseName: string }) =>
        camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1),
    },
  ]);

  const { name: enteredName, camelCaseName, typeName, urlPath } = answers;

  const name = toTitleCase(enteredName);

  const outDir = path.resolve('.', 'generators', typeName);
  const templateDir = path.resolve('.', 'scripts', 'new-generator', 'template');

  copyFiles({
    srcDir: templateDir,
    destDir: outDir,
    name,
    camelCaseName,
    typeName,
  });

  const pageOutDir = path.resolve('.', 'pages', urlPath);
  const pageTemplateDir = path.resolve(
    '.',
    'scripts',
    'new-generator',
    'page-template'
  );

  copyFiles({
    srcDir: pageTemplateDir,
    destDir: pageOutDir,
    name,
    camelCaseName,
    typeName,
  });
};

run();
