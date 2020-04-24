import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { initControllers } from 'platform/controllers/init-controllers';
import { configureClientStores } from 'platform/client/configure-client-stores';
import { App } from 'platform/common/App';
import 'styles/global.scss';

const stores = configureClientStores(window.__INITIAL_STATE__);
initControllers();

loadableReady(() => {
  hydrate(
    <BrowserRouter>
      <App stores={stores} />
    </BrowserRouter>,
    document.getElementById('app')
  );
});
