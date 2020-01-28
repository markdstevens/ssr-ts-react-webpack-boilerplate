import loadable from '@loadable/component';
import { Route } from './types';
import {
  serverFetch,
  store,
  PokemonState,
  PokemonParams
} from 'stores/pokemon';
import { withStatefulDynamicRoute } from 'components/hocs';

export const pokemonRoute: Route = {
  name: 'pokemon',
  path: '/pokemon/:name',
  exact: true,
  serverFetch,
  component: withStatefulDynamicRoute<PokemonState, PokemonParams>(
    loadable(() => import('../pages/pokemon')),
    store
  )
};
