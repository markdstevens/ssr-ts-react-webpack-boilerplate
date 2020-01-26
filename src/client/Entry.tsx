import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App';

import 'styles/global.scss';

hydrate(
  <BrowserRouter>
    <App data={window.__INITIAL_STATE__} />
  </BrowserRouter>,
  document.getElementById('app')
);
