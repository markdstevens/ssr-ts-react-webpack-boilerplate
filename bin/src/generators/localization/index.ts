import inquirer from 'inquirer';
import path from 'path';
import { existsSync, writeFileSync } from 'fs';
import { i18nTemplate } from './templates';

const getI18nDir = (locFile: string) => path.join(__dirname, `../../../../src/i18n/${locFile}`);
const getI18nFileName = (country: string, region: string) => `strings.${country}-${region}.ts`;

export const localizationGenerator = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'countryCode',
      type: 'input',
      message: 'Country code (e.g. en)',
      validate: input => {
        if (!input) {
          return 'country code must not be empty';
        }

        if (input.length !== 2) {
          return 'country code must be two characters';
        }

        return true;
      }
    },
    {
      name: 'regionCode',
      type: 'input',
      message: 'Region code (e.g. US)',
      validate: (input, answers) => {
        if (!input) {
          return 'region code must not be empty';
        }

        if (input.length !== 2) {
          return 'region code must be two characters';
        }

        if (input.toUpperCase() !== input) {
          return 'region code must be all uppercase';
        }

        const i18nFileName = getI18nFileName(answers?.countryCode, input);
        if (existsSync(getI18nDir(i18nFileName))) {
          return `localization file for ${answers?.countryCode}-${input} already exists`;
        }

        return true;
      }
    }
  ]);

  const { countryCode, regionCode } = answers;

  const i18nFileName = getI18nFileName(countryCode, regionCode);
  const pathToNewI18nFile = getI18nDir(i18nFileName);

  writeFileSync(pathToNewI18nFile, i18nTemplate());
};
