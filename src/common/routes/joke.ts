import loadable from '@loadable/component';
import { Route } from './types';
import { serverFetch, store, JokeState } from 'stores/joke';
import { withStatefulStaticRoute } from 'components/hocs';
import { config } from 'config/base';

export const jokeRoute: Route = {
  name: 'joke',
  path: '/joke',
  exact: true,
  serverFetch,
  component: withStatefulStaticRoute<JokeState>(
    loadable(() => import('../pages/Joke')),
    store,
    config.stores.joke.url
  )
};
