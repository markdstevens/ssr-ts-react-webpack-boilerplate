import React, { FC } from 'react';
import { JokeProps } from 'stores/joke';

const Joke: FC<JokeProps> = ({ state, loading, error }: JokeProps) => {
  if (loading || error) {
    return <div>{loading ? 'Loading...' : error}</div>;
  }

  return <div>{/* state?.data?. */}</div>;
};
Joke.displayName = 'Joke';

export default Joke;
