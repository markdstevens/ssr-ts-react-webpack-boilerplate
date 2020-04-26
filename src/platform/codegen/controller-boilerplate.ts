import { readdirSync, writeFileSync, unlinkSync, existsSync } from 'fs';
import { pascalCase } from 'pascal-case';
import path from 'path';

const controllers = readdirSync(path.join(__dirname, '../../controllers'));
const controllersMetaData = controllers
  .map(controller => controller.replace('.ts', ''))
  .map(controller => ({
    pascalControllerName: pascalCase(controller),
    originalControllerName: controller
  }));

const controllerTemplate = `import { Controller } from './controller';
${controllersMetaData
  .map(
    ({ pascalControllerName, originalControllerName }) =>
      `import { ${pascalControllerName} } from 'controllers/${originalControllerName}';`
  )
  .join('\n')}

export const initControllers = (): Controller[] => [${controllersMetaData
  .map(({ pascalControllerName }) => `new ${pascalControllerName}('${pascalControllerName}')`)
  .join(', ')}];
`;

const controllerPath = path.join(__dirname, '../controllers/src/init-controllers.ts');

if (existsSync(controllerPath)) {
  unlinkSync(controllerPath);
}

writeFileSync(controllerPath, controllerTemplate);
