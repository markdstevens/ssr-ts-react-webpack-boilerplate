import { Request } from 'express';
import { config } from 'config';
import { initStore, fetchWrapper, GenericState } from 'stores/base';
import { PokemonState } from 'stores/pokemon';

export const store = initStore<PokemonState>();

export const fetch = async (pokemon: string): Promise<PokemonState> =>
  await fetchWrapper<PokemonState>(`${config.stores.pokemon.baseUrl}/${pokemon}`);

export const fetchDelegate = (req: Request): Promise<GenericState> => {
  const uri = req.params['0'].split('/');
  return fetch(uri[uri.length - 1]);
};
