import {Request} from 'express';
import {config} from 'config';
import {initStore, fetchWrapper} from 'stores/base';
import {PokemonState, PokemonParams} from 'stores/pokemon';

export const store = initStore<PokemonState>();

export const fetch = async ({params}: Request): Promise<PokemonState> => {
  let {url} = config.stores.pokemon;
  const path = params['0'];

  const result = path.match(/\/pokemon\/(?<id>.*)/);
  const pathParams: PokemonParams = result?.groups ? {
    id: result.groups.id
  }: {
    id: ''
  };

  url = url.replace(':id', pathParams.id);

  return await fetchWrapper<PokemonState>(url);
};
