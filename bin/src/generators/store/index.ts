import inquirer from 'inquirer';
import { pascalCase } from 'pascal-case';
import path from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { store } from './templates';

const getStorePath = (storeName: string) => path.join(__dirname, `../../../../src/common/stores/${storeName}.ts`);

export const storeGenerator = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'storeName',
      type: 'input',
      message: 'Store name (e.g. todo-store)',
      validate: input => {
        if (!input) {
          return 'store name must not be empty';
        }

        if (!input.endsWith('-store')) {
          return 'store name must end with "-store"';
        }

        const storeFile = getStorePath(input);
        if (existsSync(storeFile)) {
          return 'store already exists';
        }

        return true;
      }
    }
  ]);

  const { storeName } = answers;
  const pascalStoreName = pascalCase(storeName);
  const storeFile = getStorePath(storeName);

  writeFileSync(`${storeFile}`, store(pascalStoreName));
};
