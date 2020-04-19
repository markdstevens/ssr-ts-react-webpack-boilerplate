const fs = require('fs');
const path = require('path');

const controllersDir = path.join(__dirname, 'src/common/controllers');

const controllers = fs.readdirSync(controllersDir).filter(controller => controller.endsWith('-controller.ts'));

const config = [];

controllers.forEach(controller => {
  const file = fs.readFileSync(`${controllersDir}/${controller}`).toString('UTF-8');
  const controllerBaseRouteMatches = Array.from(file.matchAll(/@baseRoute\('(.*)'\)/gi));
  if (controllerBaseRouteMatches.length !== 1) {
    throw new Error(
      `All controllers must have exactly one "@baseRoute" annotation, ${controller} has ${controllerBaseRouteMatches.length}`
    );
  }
  const controllerBaseRoute = controllerBaseRouteMatches[0][1];

  const controllerActions = [];
  const controllerActionMatches = Array.from(file.matchAll(/@view\('(.*)'\)/gi));
  controllerActionMatches.forEach(controllerActionMatch => controllerActions.push(controllerActionMatch[1]));

  console.log(controllerActions);
});
