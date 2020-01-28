import { State } from 'stores/base';
import { RouteComponentProps } from 'react-router-dom';

export type PokemonProps = RouteComponentProps<PokemonParams>;
export type PokemonState = State<PokemonApiResponse>;
export interface PokemonParams {
  [key: string]: string;
  name: string;
}
