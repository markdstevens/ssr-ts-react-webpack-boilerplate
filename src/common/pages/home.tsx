import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';

const Home: FunctionComponent<void> = () => (
  <div>
    <Link to="/pokemon/lugia">Lugia</Link>
  </div>
);

export default Home;
