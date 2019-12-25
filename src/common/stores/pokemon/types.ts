import {IState} from 'stores/base';
import {PokemonApiResponse} from 'stores/pokemon/generated/pokemon-api-full';
import {RouteComponentProps} from 'react-router-dom';

export type PokemonProps = RouteComponentProps<PokemonParams>;

export type PokemonState = IState<PokemonApiResponse>;

export interface PokemonParams {
  id: string;
}
