import React from 'react';
import { Link } from 'react-router-dom';
import { PokemonState, PokemonProps, store } from 'stores/pokemon';
import { Ability } from 'stores/generated/pokemon-store-types';
import { useDataFetching } from 'hooks/use-data-fetching';
import { config } from 'config';

export const Pokemon: React.FunctionComponent<PokemonProps> = (props: PokemonProps) => {
  const apiURL = `${config.stores.pokemon.baseUrl}/${props.match.params.id}`;
  const [state, dispatch] = store.useCustomState();
  const { loading, error } = useDataFetching<PokemonState>(apiURL, state, dispatch);

  if (loading || error) {
    return (
      <div>{loading ? 'Loading...' : error}</div>
    );
  }

  return (
    <>
      {state?.data?.abilities?.map((ability: Ability) => ability.ability.name).map((name: string, key: number) => (
        <div key={key}>{name}</div>
      ))}
      <Link to="/pokemon/charizard">Charizard!</Link>
      <br />
      <Link to="/pokemon/raichu">Raichu</Link>
      <br/>
      <Link to="/">Home</Link>
    </>
  );
};
Pokemon.displayName = 'Pokemon';
