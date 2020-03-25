import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Home: FC<RouteComponentProps> = () => (
  <>
    <Button variant="contained" color="primary">
      Primary
    </Button>

    <Button variant="contained" color="secondary">
      Secondary
    </Button>
  </>
);

export default Home;
