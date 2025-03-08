#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/diff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filename1>')
  .argument('<filename2>')
  .action((filename1, filename2) => {
    try {
      // Получаем полные пути к файлам
      const filepath1 = fs.existsSync(filename1)
        ? filename1
        : path.resolve(process.cwd(), '__fixtures__', filename1);
      const filepath2 = fs.existsSync(filename2)
        ? filename2
        : path.resolve(process.cwd(), '__fixtures__', filename2);

      // Вычисляем разницу, передавая пути к файлам
      const diff = genDiff(filepath1, filepath2);

      // Выводим результат
      console.log(diff);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1); // Завершаем программу с ошибкой
    }
  });

program.parse();
