import React from 'react';
import { Link } from'react-router-dom';

import lodash from 'lodash';

export const Home = (): JSX.Element => {
  console.log(lodash.capitalize("mark stevens"))
  return (
    <>
      <div>Home!</div>
      <Link to="/pokemon/charizard">Charizard!</Link>
    </>
  );
}
Home.displayName = 'Home';
