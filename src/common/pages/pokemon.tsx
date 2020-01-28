import React, { FunctionComponent } from 'react';
import { PokemonState, PokemonProps, store } from 'stores/pokemon';
import { useDataFetching } from 'hooks/use-data-fetching';
import { config } from 'config';

const Pokemon: FunctionComponent<PokemonProps> = ({
  match: { params }
}: PokemonProps) => {
  const [state, dispatch] = store.useCustomState();
  const { loading, error } = useDataFetching<PokemonState>(
    config.stores.pokemon.url,
    params,
    state,
    dispatch
  );

  if (loading || error) {
    return <div>{loading ? 'Loading...' : error}</div>;
  }

  return <div>{state?.data?.name}</div>;
};
Pokemon.displayName = 'Pokemon';

export default Pokemon;
