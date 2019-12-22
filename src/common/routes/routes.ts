import { Request } from 'express';
import { RouteComponentProps } from 'react-router-dom';
import { fetch as pokemonFetch, store, IPokemonState, PokemonParams } from 'stores/pokemon';
import { GenericState } from 'stores/base'
import { RouterWrapper } from 'components/hocs';
import { Home, Pokemon } from 'pages';

export interface RouteProps<T, R> extends RouteComponentProps<R> {
  fetchInitialData?: (...args: any) => Promise<T>;
}

export interface IRoute {
  path: string;
  exact: boolean;
  component: (props: RouteProps<GenericState, any>) => JSX.Element;
  fetchInitialData?: (...args: any) => Promise<GenericState>;
}

export const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/pokemon/:id',
    exact: true,
    component: RouterWrapper<IPokemonState, PokemonParams>(Pokemon, store),
    fetchInitialData: (req: Request): Promise<GenericState> => {
      const uri = req.params['0'].split('/');
      return pokemonFetch(uri[uri.length - 1]);
    }
  }
];
