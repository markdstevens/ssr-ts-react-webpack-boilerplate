import React, { FC } from 'react';
import { PokemonProps } from 'stores/pokemon';

const Pokemon: FC<PokemonProps> = ({ state, loading, error }: PokemonProps) => {
  if (loading || error) {
    return <div>{loading ? 'Loading...' : error}</div>;
  }

  return <div>{/* state?.data?. */}</div>;
};
Pokemon.displayName = 'Pokemon';

export default Pokemon;
