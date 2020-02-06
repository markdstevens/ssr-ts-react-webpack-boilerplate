import React, { FC, memo } from 'react';
import { PageProps } from 'controllers/types';
import { State } from 'utils/store';
import { Link } from 'react-router-dom';

type JokeState = State<JokeApiResponse>;
type JokeProps = PageProps<JokeState>;

const Joke: FC<JokeProps> = ({ state, loading, error }: JokeProps) => {
  if (loading || error) {
    return loading ? <div>Loading...</div> : <div>Error!</div>;
  }

  return (
    <>
      <div>{state?.data?.joke}</div>
      <Link to="/joke">Joke</Link>
    </>
  );
};

export default memo(Joke);
