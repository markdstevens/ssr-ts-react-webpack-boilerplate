import React from 'react';
import path from 'path';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { App } from 'components/common/App';
import { StaticRouter, matchPath } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import { logger } from 'utils/logger';
import { config } from 'config/base';
import createLocaleMiddleware from 'express-locale';
import { initViewControllers } from 'controllers';
import { Event } from 'utils/event';
import { configureServerStores } from './configure-server-stores';
import { ServerContextStore } from 'stores/platform/server-context-store';
import { LocalizationStore } from 'stores/platform/localization-store';

const statsFile = path.resolve('dist/loadable-stats.json');

const server = express();
server.set('views', 'src/public');
server.set('view engine', 'ejs');
server.use(express.static('dist'));
server.use(createLocaleMiddleware());

server.get('*', async (req, res) => {
  const extractor = new ChunkExtractor({ statsFile });

  const stores = configureServerStores(req);
  const { state } = stores.get<ServerContextStore>('serverContextStore');
  const localizationStore = stores.get<LocalizationStore>('localizationStore');

  await localizationStore.fetch(state.language, state.region);

  const controllers = initViewControllers();
  const activeController = controllers.find(controller => matchPath(req.url, controller));

  if (!activeController) {
    logger.event(Event.NO_ROUTE_FOUND, `error='no route found that matches ${req.url}'`);
  }

  await activeController?.serverFetch?.(req, stores);

  const html = renderToString(
    extractor.collectChunks(
      <StaticRouter location={req.url}>
        <App stores={stores} controllers={controllers} />
      </StaticRouter>
    )
  );

  const [linkTags, styleTags, scriptTags] = [
    extractor.getLinkTags(),
    extractor.getStyleTags(),
    extractor.getScriptTags()
  ];

  res.render('index', {
    isDev: __DEV__,
    stores: JSON.stringify(stores) || '',
    htmlWebpackPlugin: {
      options: {
        title: 'React App',
        scriptTags,
        linkTags,
        styleTags,
        html
      }
    },
    inject: false
  });
});

server.listen(config.port, () => logger.info('App listening on port 3000!'));
