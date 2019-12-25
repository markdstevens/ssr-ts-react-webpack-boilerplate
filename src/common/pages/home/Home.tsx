import React from 'react';
import {Link} from 'react-router-dom';

export const Home = (): JSX.Element => {
  return (
    <>
      <div>Home!</div>
      <Link to="/pokemon/charizard">Charizard!</Link>
    </>
  );
};
Home.displayName = 'Home';
