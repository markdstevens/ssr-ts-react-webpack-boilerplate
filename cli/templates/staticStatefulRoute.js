const staticStatefulRouteTemplate = (answers) => (
  `import loadable from '@loadable/component';
import {Route} from './types';
import {fetch, store} from 'stores/${answers.name.lower}';
import {withStatefulStaticRoute} from 'components/hocs';

export const ${answers.name.camel}Route: Route = {
  name: '${answers.name.exact}',
  path: '${answers.path}',
  exact: true,
  component: withStatefulStaticRoute(
      loadable(() => import('../pages/${answers.name.camel}')),
      store
  ),
  fetchInitialData: fetch
};
`);

module.exports = staticStatefulRouteTemplate;
