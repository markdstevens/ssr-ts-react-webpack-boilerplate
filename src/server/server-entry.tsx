import React from 'react';
import path from 'path';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { App } from 'components/App';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Controller } from 'common/controllers';
import { GenericState } from 'utils/store';
import { ChunkExtractor } from '@loadable/server';
import { logger } from 'utils/logger';
import { Event } from 'utils/event';
import { controllers } from 'controllers';
import { config } from 'config/base';
import createLocaleMiddleware from 'express-locale';

const statsFile = path.resolve('dist/loadable-stats.json');

const server = express();
server.set('views', 'src/public');
server.set('view engine', 'ejs');
server.use(express.static('dist'));
server.use(createLocaleMiddleware());

server.get('*', (req, res, next) => {
  const extractor = new ChunkExtractor({ statsFile });

  const activeController: Controller | undefined = controllers.find(controller =>
    matchPath(req.url, controller)
  );

  if (!activeController) {
    logger.event(Event.NO_ROUTE_FOUND, `error='no route found that matches ${req.url}'`);
  }

  const dataForPage: Promise<GenericState | void> = activeController?.serverFetch
    ? activeController.serverFetch(req)
    : Promise.resolve();

  dataForPage
    .then((data: GenericState | void) => {
      const html = renderToString(
        extractor.collectChunks(
          <StaticRouter location={req.url}>
            <App data={data} />
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
        data: JSON.stringify(data),
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
    })
    .catch(next);
});

server.listen(config.port, () => logger.info('App listening on port 3000!'));
