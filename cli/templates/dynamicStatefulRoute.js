const dynamicStatefulRoute = (answers) => (
  `import loadable from '@loadable/component';
import { Route } from './types';
import { serverFetch, store } from 'stores/${answers.name.lower}';
import { withStatefulDynamicRoute } from 'components/hocs';

export const ${answers.name.camel}Route: Route = {
  name: '${answers.name.exact}',
  path: '${answers.path}',
  exact: true,
  serverFetch,
  component: withStatefulDynamicRoute(
    loadable(() => import('../pages/${answers.name.camel}')),
    store
  )
};
`);

module.exports = dynamicStatefulRoute;
