import React, { FC, memo } from 'react';
import { PageProps } from 'controllers';
import { PokemonParams, PokemonState } from 'controllers/pokemon-controller';
import { Link } from 'react-router-dom';

type PokemonProps = PageProps<PokemonState, PokemonParams>;

const Pokemon: FC<PokemonProps> = ({ state, loading, error }: PokemonProps) => {
  if (loading || error) {
    return <div>{loading ? 'Loading...' : error}</div>;
  }

  return (
    <>
      <Link to="/pokemon/pikachu">Pikachu</Link>
      <Link to="/pokemon/charizard">Charizard</Link>
      <Link to="/pokemon/mewtwo">Mewtwo</Link>
      <br />
      <div>{state?.data?.name}</div>
      <Link to="/home">Home</Link>
    </>
  );
};

Pokemon.displayName = 'Pokemon';

export default memo(Pokemon);
