import React, { FunctionComponent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

const Home: FunctionComponent<RouteComponentProps> = () => (
  <div>
    <Link to="/pokemon/lugia">Lugia</Link>
  </div>
);

export default Home;
