import {State} from 'stores/base';
import {PokemonApiResponse} from 'stores/pokemon/generated/pokemon-api-full';
import {RouteComponentProps} from 'react-router-dom';

export type PokemonProps = RouteComponentProps<PokemonParams>;

export type PokemonState = State<PokemonApiResponse>;

export interface PokemonParams {
  id: string;
}
