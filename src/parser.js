import fs from 'fs';
import path from 'path';

// Функция для поиска файла в указанных папках
const findFile = (filename) => {
  const directories = [
    path.resolve(process.cwd(), '__fixtures__'), // Ищем в папке __fixtures__
    process.cwd(), // Ищем в текущей директории
  ];

  for (const dir of directories) {
    const filepath = path.resolve(dir, filename);
    if (fs.existsSync(filepath)) {
      return filepath; // Возвращаем путь, если файл найден
    }
  }

  throw new Error(`File "${filename}" not found in ${directories.join(', ')}`);
};

// Функция для чтения и парсинга JSON-файла
const readFile = (filename) => {
  const filepath = findFile(filename); // Находим файл
  const fileContent = fs.readFileSync(filepath, 'utf-8'); // Читаем файл

  // Проверяем расширение файла
  const ext = path.extname(filename).toLowerCase();
  if (ext !== '.json') {
    throw new Error(`Unsupported file format: ${ext}. Only JSON files are supported.`);
  }

  return JSON.parse(fileContent); // Парсим JSON
};

export default readFile;