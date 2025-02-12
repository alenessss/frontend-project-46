#!/usr/bin/env node
import { Command } from 'commander';
import readFile from '../src/parse.js';

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
      // Чтение и парсинг JSON-файлов
      const data1 = readFile(filename1);
      const data2 = readFile(filename2);

      // Вывод данных (пока просто для проверки)
      console.log('File 1:', data1);
      console.log('File 2:', data2);

      // Здесь будет логика сравнения файлов
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1); // Завершаем программу с ошибкой
    }
  });

program.parse();