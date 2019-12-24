import { Request } from 'express';
import { fetch as pokemonFetch, store, PokemonState, PokemonParams } from 'stores/pokemon';
import { GenericState } from 'stores/base'
import { RouterWrapper } from 'components/hocs';
import Home from 'pages/home';
import loadable from '@loadable/component';
import { Route } from 'routes';

const AsyncPokemon = loadable(() => import(/* webpackChunkName: "pokemon-route" */ '../pages/pokemon'));

export const routes: Route[] = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/pokemon/:id',
    exact: true,
    component: RouterWrapper<PokemonState, PokemonParams>(AsyncPokemon, store),
    fetchInitialData: (req: Request): Promise<GenericState> => {
      const uri = req.params['0'].split('/');
      return pokemonFetch(uri[uri.length - 1]);
    }
  }
];
