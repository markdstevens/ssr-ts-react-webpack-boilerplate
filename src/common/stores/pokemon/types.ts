import { State } from 'stores/base';
import { DataFetchingProps } from 'hooks/use-data-fetching';
import { RouteComponentProps } from 'react-router-dom';

export type PokemonProps = RouteComponentProps<PokemonParams> &
  DataFetchingProps<PokemonState>;
export type PokemonState = State<PokemonApiResponse>;
export interface PokemonParams {
  [key: string]: string;
  name: string;
}
