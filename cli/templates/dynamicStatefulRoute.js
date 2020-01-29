const dynamicStatefulRoute = (answers) => (
  `import loadable from '@loadable/component';
import { Route } from './types';
import {
  serverFetch,
  store,
  ${answers.name.pascal}State,
  ${answers.name.pascal}Params
} from 'stores/${answers.name.lower}';
import { withStatefulDynamicRoute } from 'components/hocs';
import { config } from 'config/base';

export const ${answers.name.camel}Route: Route = {
  name: '${answers.name.exact}',
  path: '${answers.path}',
  exact: true,
  serverFetch,
  component: withStatefulDynamicRoute<${answers.name.pascal}State, ${answers.name.pascal}Params>(
    loadable(() => import('../pages/${answers.name.camel}')),
    store,
    config.stores.${answers.name.lower}.url
  )
};
`);

module.exports = dynamicStatefulRoute;
