import React, { FunctionComponent } from 'react';
import { PokemonState, PokemonProps, store } from 'stores/pokemon';
import { useDataFetching } from 'hooks/use-data-fetching';
import { config } from 'config';
import { Link } from 'react-router-dom';

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

  return (
    <>
      <Link to="/pokemon/charizard">Charizard</Link>
      <Link to="/pokemon/blastoise">Blastoise</Link>
      <Link to="/pokemon/venusaur">Venusaur</Link>
      <div>{state?.data?.name}</div>
    </>
  );
};
Pokemon.displayName = 'Pokemon';

export default Pokemon;
