import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { initViewControllers } from 'controllers';
import { configureClientStores } from 'platform/client/configure-client-stores';
import { App } from 'platform/common/App';
import 'styles/global.scss';

const stores = configureClientStores(window.__INITIAL_STATE__);
const controllers = initViewControllers();

loadableReady(() => {
  hydrate(
    <BrowserRouter>
      <App stores={stores} controllers={controllers} />
    </BrowserRouter>,
    document.getElementById('app')
  );
});
