const fs = require('fs');
const path = require('path');
const pascalcase = require('pascalcase');
const camelcase = require('camelcase');
const { pathToRegexp } = require('path-to-regexp');
const { json2ts } = require('json-ts');
const axios = require('axios');
const inquirer = require('inquirer');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const {
  simpleRouteTemplate,
  dynamicStatefulRouteTemplate,
  staticStatefulRouteTemplate,
  basicPageTemplate,
  dataFetchingPageNoPathParamsTemplate,
  dataFetchingWithPathParamsTemplate,
  typesTemplate,
  pathParamsStoreTemplate,
  noPathParamsStoreTemplate
} = require('./templates');

const config = {
  routesDir: path.resolve(__dirname, '../src/common/routes'),
  pagesDir: path.resolve(__dirname, '../src/common/pages'),
  storesDir: path.resolve(__dirname, '../src/common/stores'),
  configDir: path.resolve(__dirname, '../src/config')
};

const commonValidator = (val, minLength = 2) => {
  if (!val) {
    return 'ERROR: input must not be blank';
  }
  if (val.length < minLength) {
    return `ERROR: input must be at least ${minLength} characters`;
  }
  return true;
};

const updateRoutesFile = (config, answers) => {
  const text = fs
    .readFileSync(`${config.routesDir}/routes.ts`)
    .toString('utf-8');
  const textByLine = text.split('\n');
  let routeEntryAlreadyExists = false;
  let indexToInsertRoute = -1;

  let importAlreadyExists = false;
  let indexToInsertImport = -1;

  const newImport = `import { ${answers.name.camel}Route } from './${answers.name.camel}';`;
  const newRouteEntry = `  ${answers.name.camel}Route,`;

  textByLine.forEach((line, i) => {
    if (line.includes(newImport)) importAlreadyExists = true;
    if (line.includes(newRouteEntry)) routeEntryAlreadyExists = true;
    if (indexToInsertImport === -1 && !line.includes('import'))
      indexToInsertImport = i;
    if (line.includes('const routes: Route[] = ['))
      indexToInsertRoute = i + (importAlreadyExists ? 1 : 2);
  });

  if (!importAlreadyExists)
    textByLine.splice(indexToInsertImport, 0, newImport);
  if (!routeEntryAlreadyExists)
    textByLine.splice(indexToInsertRoute, 0, newRouteEntry);

  fs.writeFileSync(`${config.routesDir}/routes.ts`, textByLine.join('\n'));
};

const updateBaseConfig = (config, answers) => {
  const configText = fs
    .readFileSync(`${config.configDir}/base.ts`)
    .toString('utf-8')
    .split('\n');
  let indexOfLineToInsert = -1;
  configText.forEach((line, i) => {
    if (line.includes('stores: {')) {
      indexOfLineToInsert = i + 1;
    }
  });
  configText.splice(
    indexOfLineToInsert,
    0,
    `    ${answers.name.camel}: {
      url: '${answers.apiURLWithPathParams}'
    },`
  );
  fs.writeFileSync(`${config.configDir}/base.ts`, configText.join('\n'));
};

const askQuestions = async () => {
  const actions = [];

  let answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'name your route',
      validate: commonValidator
    },
    {
      type: 'input',
      name: 'path',
      message: 'path (e.g. /todos/:id)',
      validate: input => commonValidator(input, 1)
    },
    {
      type: 'list',
      name: 'poweredByApi',
      message: 'Is this route powered by API data',
      choices: ['yes', 'no']
    }
  ]);

  // this modifies answers.name
  answers.name = {
    pascal: pascalcase(answers.name),
    camel: camelcase(answers.name),
    lower: camelcase(answers.name).toLowerCase(),
    exact: answers.name
  };

  const newStoreDirPath = `${config.storesDir}/${answers.name.lower}`;
  const newPagesDirPath = `${config.pagesDir}/${answers.name.camel}`;
  const newRouteDirPath = `${config.routesDir}/${answers.name.camel}`;

  // this modifies answers.path
  if (answers.path !== '/' && answers.path.endsWith('/'))
    answers.path = answers.path.substring(0, str.length - 1);
  if (!answers.path.startsWith('/')) answers.path = `/${answers.path}`;

  // this modifies answers.poweredByApi
  answers.poweredByApi = answers.poweredByApi === 'yes';

  actions.push(() => updateRoutesFile(config, answers));
  if (answers.poweredByApi) {
    answers = Object.assign(
      answers,
      await inquirer.prompt([
        {
          type: 'input',
          name: 'apiURL',
          message: 'API url (e.g. http://localhost:8080/todos/1)',
          validate: commonValidator
        },
        {
          type: 'input',
          name: 'apiURLWithPathParams',
          message: 'API url structure (e.g. http://localhost:8080/todos/:id',
          validate: commonValidator
        }
      ])
    );

    const url = answers.apiURL.endsWith('/')
      ? answers.apiURL.substring(0, answers.apiURL.length - 1)
      : answers.apiURL;
    const exampleJSONResponse = await axios.get(url);
    answers.types = json2ts(JSON.stringify(exampleJSONResponse.data), {
      rootName: `${answers.name.pascal}ApiResponse`,
      prefix: ''
    });

    const keys = [];
    pathToRegexp(answers.path, keys);

    actions.push(() => updateBaseConfig(config, answers));
    actions.push(() => fs.mkdirSync(newStoreDirPath));
    actions.push(() => fs.mkdirSync(`${newStoreDirPath}/generated`));
    actions.push(() =>
      fs.writeFileSync(
        `${newStoreDirPath}/index.ts`,
        `export * from './types';\nexport * from './store';\n`
      )
    );
    actions.push(() =>
      fs.writeFileSync(
        `${newStoreDirPath}/generated/${answers.name.camel}ApiResponse.d.ts`,
        answers.types
      )
    );

    if (!fs.existsSync(config.pagesDir)) {
      actions.push(() => fs.mkdirSync(config.pagesDir));
    }
    actions.push(() =>
      fs.writeFileSync(
        `${newStoreDirPath}/types.ts`,
        typesTemplate(answers.name, keys)
      )
    );
    if (!keys.length) {
      actions.push(() =>
        fs.writeFileSync(
          `${newStoreDirPath}/store.ts`,
          noPathParamsStoreTemplate(answers.name)
        )
      );
      actions.push(() =>
        fs.writeFileSync(
          `${newPagesDirPath}.tsx`,
          dataFetchingPageNoPathParamsTemplate(answers.name)
        )
      );
      actions.push(() =>
        fs.writeFileSync(
          `${newRouteDirPath}.ts`,
          staticStatefulRouteTemplate(answers)
        )
      );
    } else {
      actions.push(() =>
        fs.writeFileSync(
          `${newStoreDirPath}/store.ts`,
          pathParamsStoreTemplate(answers.name, answers.path, keys)
        )
      );
      actions.push(() =>
        fs.writeFileSync(
          `${newPagesDirPath}.tsx`,
          dataFetchingWithPathParamsTemplate(answers.name, keys)
        )
      );
      actions.push(() =>
        fs.writeFileSync(
          `${newRouteDirPath}.ts`,
          dynamicStatefulRouteTemplate(answers)
        )
      );
    }
  } else {
    actions.push(() =>
      fs.writeFileSync(
        `${newPagesDirPath}.tsx`,
        basicPageTemplate(answers.name)
      )
    );
    actions.push(() =>
      fs.writeFileSync(`${newRouteDirPath}.ts`, simpleRouteTemplate(answers))
    );
  }
  actions.forEach(action => action());
};

clear();
console.log(
  chalk.yellow(figlet.textSync('New Route', { horizontalLayout: 'full' }))
);
askQuestions();
