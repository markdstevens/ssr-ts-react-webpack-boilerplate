import { Request } from 'express';
import { config } from 'config';
import { initStore, fetchWrapper } from 'stores/base';
import { PokemonState, PokemonParams } from 'stores/pokemon';

export const store = initStore<PokemonState>();

export const serverFetch = async ({
  params
}: Request): Promise<PokemonState> => {
  const result = params['0'].match(/\/pokemon\/(?<name>.*)/);
  const pathParams: PokemonParams | undefined = result?.groups && {
    name: result.groups.name
  };

  return await fetchWrapper<PokemonState>(
    config.stores.pokemon.url,
    pathParams
  );
};
