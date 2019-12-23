import { IState } from 'stores/base';
import { PokemonApiResponse } from 'stores/generated/pokemon-store-types';

export type PokemonState = IState<PokemonApiResponse>;

export interface PokemonParams {
  id: string;
}
