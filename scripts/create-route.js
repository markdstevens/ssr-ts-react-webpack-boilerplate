/* eslint-disable */
const readline = require('readline-promise');
const fs = require('fs');
const path = require('path');
const pascalcase = require('pascalcase');
const camelcase = require('camelcase');
const { pathToRegexp } = require("path-to-regexp");
const { json2ts } = require('json-ts');
const axios = require('axios');

const {
  simpleRouteTemplate,
  dynamicStatefulRouteTemplate,
  staticStatefulRouteTemplate,
  basicPageTemplate,
  dataFetchingPageNoPathParamsTemplate,
  dataFetchingWithPathParamsTemplate,
  typesTemplate,
  storeTemplate
} = require('./templates');

const config = {
  routesDir: path.resolve(__dirname, '../src/common/routes'),
  pagesDir: path.resolve(__dirname, '../src/common/pages'),
  storesDir: path.resolve(__dirname, '../src/common/stores'),
  configDir: path.resolve(__dirname, '../src/config')
};

const rlp = readline.default.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

const questionWithRetry = async (question, validate, augment = (val) => val) => {
  let valid = false;
  let answer;
  while (!valid) {
    answer = await rlp.questionAsync(question);
    const errorMsg = validate(answer);
    if (!errorMsg) {
      valid = true;
    } else {
      console.log(errorMsg);
    }
  }
  return augment(answer);
};

const commonValidator = (val, minLength = 2) => {
  if (!val) {
    return 'ERROR: input must not be blank';
  }
  if (val.length < minLength) {
    return `ERROR: input must be at least ${minLength} characters`;
  }
  return null;
};

const yesNoValidator = (val) => {
  if (!val) {
    return 'ERROR: input must not be blank';
  }
  let lowerCaseVal = val.toLowerCase();
  if (!(lowerCaseVal === 'y' || lowerCaseVal === 'yes' || lowerCaseVal === 'n' || lowerCaseVal === 'no')) {
    return 'ERROR: input must match one of [n, no, y, yes]';
  }
  return null;
};

const updateRoutesFile = (config, answers) => {
  const text = fs.readFileSync(`${config.routesDir}/routes.ts`).toString('utf-8');
  const textByLine = text.split('\n');
  let routeEntryAlreadyExists = false;
  let indexToInsertRoute = -1;

  let importAlreadyExists = false;
  let indexToInsertImport = -1;

  const newImport = `import {${answers.name.camel}Route} from './${answers.name.camel}';`;
  const newRouteEntry = `  ${answers.name.camel}Route,`;

  textByLine.forEach((line, i) => {
    if (line.includes(newImport)) importAlreadyExists = true;
    if (line.includes(newRouteEntry)) routeEntryAlreadyExists = true;
    if (indexToInsertImport === -1 && !line.includes('import')) indexToInsertImport = i;
    if (line.includes('const routes: Route[] = [')) indexToInsertRoute = i + (importAlreadyExists ? 1 : 2);
  });

  if (!importAlreadyExists) textByLine.splice(indexToInsertImport, 0, newImport);
  if (!routeEntryAlreadyExists) textByLine.splice(indexToInsertRoute, 0, newRouteEntry);

  fs.writeFileSync(`${config.routesDir}/routes.ts`, textByLine.join('\n'));
};

const updateBaseConfig = (config, answers) => {
  const configText = fs.readFileSync(`${config.configDir}/base.ts`).toString('utf-8').split('\n');
  let indexOfLineToInsert = -1;
  configText.forEach((line, i) => {
    if (line.includes('stores: {')) {
      indexOfLineToInsert = i + 1;
    }
  });
  configText.splice(indexOfLineToInsert, 0, `    ${answers.name.camel}: {
      url: '${answers.apiURLWithPathParams}'
    },`);
  fs.writeFileSync(`${config.configDir}/base.ts`, configText.join('\n'));
};

const askQuestions = async () => {
  const answers = {};
  const actions = [];
  const name = await questionWithRetry('what is the name of the new route? ', commonValidator);

  answers.name = {
    pascal: pascalcase(name),
    camel: camelcase(name),
    lower: camelcase(name).toLowerCase(),
    exact: name
  };

  if (!fs.existsSync(config.pagesDir)) {
    actions.push(() => fs.mkdirSync(config.pagesDir));
  }

  const newStoreDirPath = `${config.storesDir}/${answers.name.lower}`;
  const newPagesDirPath = `${config.pagesDir}/${answers.name.camel}`;
  const newRouteDirPath = `${config.routesDir}/${answers.name.camel}`;

  answers.path = await questionWithRetry('what is the new route\'s path (e.g. /todos/:id)? ', 
    (val) => commonValidator(val, 1),
    (route) => {
      let str = route;
      if (route !== '/' && route.endsWith('/')) str = str.substring(0, str.length - 1);
      if (!route.startsWith('/')) str = `/${str}`;
      return str;
    });

  answers.poweredByApi = await questionWithRetry('is this route powered by API data (y/n)? ', yesNoValidator, (val) => {
    return val === 'y' || val === 'yes';
  });

  actions.push(() => updateRoutesFile(config, answers));

  if (answers.poweredByApi) {
    [answers.apiURL, answers.types] = await questionWithRetry(`Fully qualified API URL: `, commonValidator, async (val) => {
      val = val.endsWith('/') ? val.substring(0, str.length - 1) : val;
      const exampleJSONResponse = await axios.get(val);
      const types = json2ts(JSON.stringify(exampleJSONResponse.data), {
        rootName: `${answers.name.pascal}ApiResponse`,
        prefix: ''
      });
      return [val, types];
    });

    answers.apiURLWithPathParams = await questionWithRetry(`Fully qualified API URL with substituted path params: `, commonValidator);

    actions.push(() => updateBaseConfig(config, answers));
    actions.push(() => fs.mkdirSync(newStoreDirPath));
    actions.push(() => fs.mkdirSync(`${newStoreDirPath}/generated`));
    actions.push(() => fs.writeFileSync(`${newStoreDirPath}/store.ts`, storeTemplate(answers.name, answers.name.lower, answers.apiURLWithPathParams)));
    actions.push(() => fs.writeFileSync(`${newStoreDirPath}/index.ts`, `export * from './types';\nexport * from './store';\n`));
    actions.push(() => fs.writeFileSync(`${newStoreDirPath}/generated/${answers.name.camel}ApiResponse.d.ts`, answers.types));

    const keys = [];
    pathToRegexp(answers.path, keys);

    actions.push(() => fs.writeFileSync(`${newStoreDirPath}/types.ts`, typesTemplate(answers.name, keys)));
    if (!keys.length) {
      actions.push(() => fs.writeFileSync(`${newPagesDirPath}.tsx`, dataFetchingPageNoPathParamsTemplate(answers.name)));
      actions.push(() => fs.writeFileSync(`${newRouteDirPath}.ts`, staticStatefulRouteTemplate(answers)));
    } else {
      actions.push(() => fs.writeFileSync(`${newPagesDirPath}.tsx`, dataFetchingWithPathParamsTemplate(answers.name, keys)));
      actions.push(() => fs.writeFileSync(`${newRouteDirPath}.ts`, dynamicStatefulRouteTemplate(answers)));
    }
  } else {
    actions.push(() => fs.writeFileSync(`${newPagesDirPath}.tsx`, basicPageTemplate(answers.name)));
    actions.push(() => fs.writeFileSync(`${newRouteDirPath}.ts`, simpleRouteTemplate(answers)));
  }
  actions.forEach(action => action());
}

Promise.all([askQuestions()]).then(() => {
  rlp.close();
});
