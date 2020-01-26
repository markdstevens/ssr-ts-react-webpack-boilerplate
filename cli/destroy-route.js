const inquirer = require('inquirer');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');
const rimraf = require('rimraf');

clear();
console.log(
  chalk.yellow(figlet.textSync('Destroy Route', { horizontalLayout: 'full' }))
);

const run = async () => {
  const routesDir = path.join(__dirname, '../src/common/routes/');
  const pagesDir = path.join(__dirname, '../src/common/pages/');
  const storesDir = path.join(__dirname, '../src/common/stores/');
  const configFile = path.join(__dirname, '../src/config/base.ts');
  const routeFile = `${routesDir}routes.ts`;

  if (fs.existsSync(routesDir)) {
    const filesToExclude = ['index.ts', 'types.ts', 'routes.ts'];
    const routes = fs
      .readdirSync(routesDir)
      .filter(file => !filesToExclude.includes(file));

    const actions = [];

    if (routes && routes.length) {
      const { routeToRemove } = await inquirer.prompt([
        {
          type: 'list',
          name: 'routeToRemove',
          message: 'Which route do you want to remove',
          choices: routes.map(route => route.replace('.ts', ''))
        }
      ]);

      const camelCaseRouteName = camelcase(routeToRemove);
      const lowerCaseRouteName = routeToRemove.toLowerCase();

      const pagePath = `${pagesDir}${camelCaseRouteName}.tsx`;
      const routePath = `${routesDir}${camelCaseRouteName}.ts`;
      const storeDir = `${storesDir}${lowerCaseRouteName}`;
      const storeFiles = fs.existsSync(storeDir)
        ? fs.readdirSync(storeDir)
        : null;

      actions.push({
        action: () => fs.unlinkSync(pagePath),
        success: `Removed ${pagePath}`,
        error: `Failed to remove ${pagePath}`
      });

      actions.push({
        action: () => fs.unlinkSync(routePath),
        success: `Removed ${routePath}`,
        error: `Failed to remove ${routePath}`
      });

      if (storeFiles) {
        actions.push({
          action: () => rimraf.sync(storeDir),
          success: storeFiles
            .map(file => `Removed ${storeDir}/${file}`)
            .join('\n'),
          error: `Failed to remove ${storeDir}`
        });
      }

      actions.push({
        action: () =>
          fs.writeFileSync(
            routeFile,
            fs
              .readFileSync(routeFile)
              .toString('utf-8')
              .split('\n')
              .filter(line => !line.includes(`${camelCaseRouteName}Route`))
              .join('\n')
          ),
        success: `Removed route entry from ${routeFile}`,
        error: `Failed to remove route entry from ${routeFile}`
      });

      const configLines = fs
        .readFileSync(configFile)
        .toString('utf-8')
        .split('\n');
      let bracketCount = 0;
      let insideConfig = false;
      const configWithoutRoute = configLines.filter((line, index) => {
        if (!insideConfig) {
          if (line.includes(`${camelCaseRouteName}: {`)) {
            insideConfig = true;
            bracketCount += 1;
            return false;
          }
          return true;
        } else {
          if (line.endsWith('}') || line.endsWith('},')) {
            bracketCount--;
            if (bracketCount === 0) {
              insideConfig = false;
            }
          } else if (line.endsWith('{')) {
            bracketCount++;
          }
          return false;
        }
      });

      actions.push({
        action: () =>
          fs.writeFileSync(configFile, configWithoutRoute.join('\n')),
        success: `Removed config entry from ${configFile}`,
        error: `Failed to remove config entry from ${configFile}`
      });

      actions.forEach(actionObj => {
        try {
          actionObj.action();
          console.log(chalk.green(actionObj.success));
        } catch (e) {
          console.log(e);
          console.error(chalk.red(actionObj.error));
        }
      });
    }
  }
};

run();
