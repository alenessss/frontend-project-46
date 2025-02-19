import _ from 'lodash';
import readFile from './parser.js';

const genDiff = (filepath1, filepath2) => {
  try {
    const data1 = readFile(filepath1);
    const data2 = readFile(filepath2);

    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const allKeys = _.sortBy(_.union(keys1, keys2));

    const diff = allKeys.map(key => {
      const value1 = data1[key];
      const value2 = data2[key];

      if (_.has(data1, key) && _.has(data2, key)) {
        if (_.isEqual(value1, value2)) {
          return `  ${key}: ${value1}`;
        } else {
          return [
            `- ${key}: ${value1}`,
            `+ ${key}: ${value2}`
          ].join('\n');
        }
      } else if (_.has(data1, key)) {
        return `- ${key}: ${value1}`;
      } else {
        return `+ ${key}: ${value2}`;
      }
    });

    return `{\n${diff.join('\n')}\n}`;
  } catch (error) {
    throw new Error(`Error calculating diff: ${error.message}`);
  }
};

export default genDiff;