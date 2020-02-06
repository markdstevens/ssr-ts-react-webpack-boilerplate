import loadable from '@loadable/component';
import { config } from 'config/base';
import { BaseController, GenericPathParams } from 'controllers';
import { State } from 'utils/store';
import { fetchWrapper, UrlPathParams } from 'utils/fetch-wrapper';

export type PokemonState = State<PokemonApiResponse>;

export interface PokemonParams extends GenericPathParams {
  name: string;
}

export class PokemonController extends BaseController<PokemonState, PokemonParams> {
  public path = '/pokemon/:name';
  public component = loadable(() => import('../pages/pokemon'));

  public async fetch(pathParams: UrlPathParams): Promise<PokemonState> {
    return await fetchWrapper<PokemonState>(config.api.pokemon.url, pathParams);
  }
}
