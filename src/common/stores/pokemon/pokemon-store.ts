import { config } from 'config';
import { initStore, fetchWrapper } from 'stores/base';
import { IPokemonState } from 'stores/pokemon';

export const store = initStore<IPokemonState>((prevState: IPokemonState, nextState: IPokemonState) => {
  return Object.assign({}, prevState, nextState);
});

export const fetch = async (pokemon: string): Promise<IPokemonState> =>
  await fetchWrapper<IPokemonState>(`${config.stores.pokemon.baseUrl}/${pokemon}`);
