#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { program } from 'commander';
import { storeGenerator } from './generators/store';
import { localizationGenerator } from './generators/localization';
import inquirer from 'inquirer';
import { controllerGenerator } from './generators/controller';
import npm from 'npm';

clear();
console.log(chalk.green(figlet.textSync('generator', { horizontalLayout: 'full' })));

program
  .version('0.0.1')
  .description('A CLI for generating boilerplate')
  .option('-d --debug', 'Output debug values')
  .option('-c, --controller', 'Generate controller')
  .option('-l --localization', 'Generate localization file')
  .option('-s, --store', 'Generate store')
  .parse(process.argv);

if (program.debug) console.log(program.opts());

async function run() {
  while (true) {
    const answer = await inquirer.prompt([
      {
        name: 'generator',
        message: 'Pick a generator',
        type: 'list',
        choices: ['controller', 'store', 'localization file']
      }
    ]);

    switch (answer.generator) {
      case 'controller':
        await controllerGenerator();
        break;
      case 'store':
        await storeGenerator();
        break;
      case 'localization file':
        await localizationGenerator();
        break;
      default:
        break;
    }

    console.log();

    const shouldContinueAnswer = await inquirer.prompt([
      {
        name: 'shouldContinue',
        message: 'Would you like to continue',
        type: 'confirm'
      }
    ]);

    if (shouldContinueAnswer.shouldContinue) {
      clear();
    } else {
      (npm as any).load(() => (npm as any).run('codegen'));
      break;
    }
  }
}

run();
