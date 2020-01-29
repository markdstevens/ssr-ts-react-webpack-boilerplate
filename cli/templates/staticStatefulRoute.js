const staticStatefulRouteTemplate = (answers) => (
  `import loadable from '@loadable/component';
import { Route } from './types';
import {
  serverFetch,
  store,
  ${answers.name.pascal}State
} from 'stores/${answers.name.lower}';
import { withStatefulStaticRoute } from 'components/hocs';
import { config } from 'config/base';

export const ${answers.name.camel}Route: Route = {
  name: '${answers.name.exact}',
  path: '${answers.path}',
  exact: true,
  serverFetch,
  component: withStatefulStaticRoute<${answers.name.pascal}State>(
    loadable(() => import('../pages/${answers.name.pascal}')),
    store,
    config.stores.${answers.name.lower}.url
  )
};
`);

module.exports = staticStatefulRouteTemplate;
