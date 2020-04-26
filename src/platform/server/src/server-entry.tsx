import React from 'react';
import path from 'path';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import createLocaleMiddleware from 'express-locale';
import { config } from 'config/base';
import { configureServerStores, fetchInitialRouteData } from 'platform/server';
import { ServerContextStore, LocalizationStore } from 'platform/stores';
import { controllerRegistry, initControllers } from 'platform/controllers';
import { logger } from 'platform/utils';
import { App } from 'platform/components';

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

  await stores.get<LocalizationStore>('localizationStore').fetch(state.language, state.region);

  initControllers();

  const controllerAction = controllerRegistry.findActionByFullPath(req.path);
  await fetchInitialRouteData(controllerAction, stores, req.path);

  const html = renderToString(
    extractor.collectChunks(
      <StaticRouter location={req.url}>
        <App stores={stores} />
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
