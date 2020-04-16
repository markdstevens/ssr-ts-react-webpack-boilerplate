import inquirer from 'inquirer';
import { pascalCase } from 'pascal-case';
import path from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { store, index, context, reducer, useStore } from './templates';

const getStorePath = (storeName: string) => path.join(__dirname, `../../../../src/common/stores/${storeName}`);

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

        const storeDir = getStorePath(input);
        if (existsSync(storeDir)) {
          return 'store already exists';
        }

        return true;
      }
    }
  ]);

  const { storeName } = answers;
  const pascalStoreName = pascalCase(storeName);
  const storeDir = getStorePath(storeName);

  mkdirSync(storeDir);
  writeFileSync(`${storeDir}/store.ts`, store(pascalStoreName));
  writeFileSync(`${storeDir}/context.ts`, context(pascalStoreName));
  writeFileSync(`${storeDir}/reducer.ts`, reducer(pascalStoreName));
  writeFileSync(`${storeDir}/use${pascalStoreName}.ts`, useStore(pascalStoreName));
  writeFileSync(`${storeDir}/index.ts`, index(pascalStoreName));
};
