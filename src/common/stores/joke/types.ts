import { State } from 'stores/base';
import { DataFetchingProps } from 'hooks/use-data-fetching';

export type JokeProps = DataFetchingProps<JokeState>;
export type JokeState = State<JokeApiResponse>;
