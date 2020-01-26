import React, {FunctionComponent} from 'react';
import {PokemonState, PokemonProps, store} from 'stores/pokemon';
import {useDataFetching} from 'hooks/use-data-fetching';
import {config} from 'config';

const Pokemon: FunctionComponent<PokemonProps> = (
    {match}: PokemonProps
) => {
  /**
   * update this variable to use match.params to form the correct API url
   *
   * You have access to:
   *  match.params.id
   */
  const {url} = config.stores.pokemon;
  const [state, dispatch] = store.useCustomState();
  const {
    loading,
    error
  } = useDataFetching<PokemonState>(url, state, dispatch);

  if (loading || error) {
    return (
      <div>{loading ? 'Loading...' : error}</div>
    );
  }

  return (
    <div>
      {state?.data?.name}
    </div>
  );
};
Pokemon.displayName = 'Pokemon';

export default Pokemon;
