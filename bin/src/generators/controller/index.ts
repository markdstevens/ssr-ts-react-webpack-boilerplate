import inquirer from 'inquirer';
import path from 'path';
import { existsSync, writeFileSync } from 'fs';
import { pascalCase } from 'pascal-case';
import { controller, view } from './templates';
import { pathToRegexp, Key } from 'path-to-regexp';

const getNewControllerPath = (controllerName: string) =>
  path.join(__dirname, `../../../../src/common/controllers/${controllerName}.ts`);

const getNewViewPath = (viewName: string) => path.join(__dirname, `../../../../src/common/views/${viewName}.tsx`);

export const controllerGenerator = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'controllerName',
      type: 'input',
      message: 'Controller name (e.g. todo-controller)',
      validate: input => {
        if (!input) {
          return 'controller name must not be empty';
        }

        if (!input.endsWith('-controller')) {
          return 'controller name must end with "-controller"';
        }

        if (existsSync(getNewControllerPath(input))) {
          return 'controller already exists';
        }

        return true;
      }
    },
    {
      name: 'controllerRoute',
      type: 'input',
      message: 'Controller route (e.g. /todos or /todo/:id)',
      validate: input => {
        if (!input) {
          return 'controller route must not be empty';
        }

        if (!input.startsWith('/')) {
          return 'controller route must start with a "/" character';
        }

        return true;
      }
    },
    {
      name: 'isStateful',
      type: 'confirm',
      message: 'Is this controller stateful'
    }
  ]);

  const { controllerName, controllerRoute, isStateful } = answers;
  const hasDynamicParams = controllerRoute.includes('/:');

  const params: Key[] = [];
  pathToRegexp(controllerRoute, params);

  const viewName = controllerName.replace('-controller', '');

  const controllerPath = getNewControllerPath(controllerName);
  const viewPath = getNewViewPath(viewName);

  writeFileSync(controllerPath, controller(isStateful, pascalCase(controllerName), controllerRoute, viewName));
  writeFileSync(viewPath, view(isStateful, pascalCase(viewName), params));
};
