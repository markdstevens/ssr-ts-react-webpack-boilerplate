import { config } from 'config';
import { initStore, fetchWrapper } from 'stores/base';
import { JokeState } from 'stores/joke';

export const store = initStore<JokeState>();

export const serverFetch = async (): Promise<JokeState> =>
  await fetchWrapper<JokeState>(config.stores.joke.url);
