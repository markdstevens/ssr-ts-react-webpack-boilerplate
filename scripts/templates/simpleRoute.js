const simpleRouteTemplate = (answers) => (
  `import loadable from '@loadable/component';
import {Route} from './types';

export const ${answers.name.camel}Route: Route = {
  name: '${answers.name.exact}',
  path: '${answers.path}',
  exact: true,
  component: loadable(() => import('../pages/${answers.name.camel}'))
};
`);

module.exports = simpleRouteTemplate;
