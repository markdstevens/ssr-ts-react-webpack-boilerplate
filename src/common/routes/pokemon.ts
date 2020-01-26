import loadable from '@loadable/component';
import {Route} from './types';
import {fetch, store} from 'stores/pokemon';
import {withStatefulDynamicRoute} from 'components/hocs';

export const pokemonRoute: Route = {
  name: 'pokemon',
  path: '/pokemon/:id',
  exact: true,
  component: withStatefulDynamicRoute(
      loadable(() => import('../pages/pokemon')),
      store
  ),
  fetchInitialData: fetch
};
