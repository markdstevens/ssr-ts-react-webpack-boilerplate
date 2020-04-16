#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { program } from 'commander';
import { storeGenerator } from './generators/store';

clear();
console.log(chalk.green(figlet.textSync('cli', { horizontalLayout: 'full' })));

program
  .version('0.0.1')
  .description('A CLI for generating boilerplate')
  .option('-d --debug', 'Output debug values')
  .option('-c, --controller', 'Generate controller')
  .option('-s, --store', 'Generate store')
  .parse(process.argv);

if (program.debug) console.log(program.opts());

async function run() {
  if (program.store) {
    storeGenerator();
  }
}

run();
