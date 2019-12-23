import { config } from 'config';
import { initStore, fetchWrapper } from 'stores/base';
import { PokemonState } from 'stores/pokemon';

export const store = initStore<PokemonState>((prevState: PokemonState, nextState: PokemonState) => {
  return Object.assign({}, prevState, nextState);
});

export const fetch = async (pokemon: string): Promise<PokemonState> =>
  await fetchWrapper<PokemonState>(`${config.stores.pokemon.baseUrl}/${pokemon}`);
