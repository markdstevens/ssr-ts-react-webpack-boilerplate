import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {PokemonState, PokemonProps, store} from 'stores/pokemon';
import {Ability} from 'stores/pokemon/generated/pokemon-api-full';
import {useDataFetching} from 'hooks/use-data-fetching';
import {config} from 'config';

export const Pokemon: FunctionComponent<PokemonProps> = (
    props: PokemonProps,
) => {
  const url = `${config.stores.pokemon.baseUrl}/${props.match.params.id}`;
  const [state, dispatch] = store.useCustomState();
  const {loading, error} = useDataFetching<PokemonState>(url, state, dispatch);

  if (loading || error) {
    return (
      <div>{loading ? 'Loading...' : error}</div>
    );
  }

  const abilityNames = state?.data?.abilities
    ?.map((ability: Ability) => ability.ability.name);

  return (
    <>
      {abilityNames.map((name: string, key: number) => (
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
