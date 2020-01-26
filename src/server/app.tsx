import React from 'react';
import path from 'path';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { App } from 'components/App';
import { StaticRouter, matchPath } from 'react-router-dom';
import { routes, Route } from 'routes';
import { GenericState } from 'stores/base';
import { ChunkExtractor } from '@loadable/server';
import { logger } from 'utils/logger';
import { Event } from 'utils/event';

const statsFile = path.resolve('dist/loadable-stats.json');

const server = express();
server.set('views', 'src/public');
server.set('view engine', 'ejs');
server.use(express.static('dist'));

server.get('*', (req, res, next) => {
  const extractor = new ChunkExtractor({ statsFile });

  const activeRoute: Route | null =
    routes.find(route => matchPath(req.url, route)) || null;

  if (activeRoute?.name === '404') {
    logger.event(
      Event.NO_ROUTE_FOUND,
      `error='no route found that matches ${req.url}'`
    );
  }

  const promise: Promise<GenericState | void> = activeRoute?.fetchInitialData
    ? activeRoute.fetchInitialData(req)
    : Promise.resolve();

  promise
    .then((data: GenericState | void) => {
      const html = renderToString(
        extractor.collectChunks(
          <StaticRouter location={req.url}>
            <App data={data} />
          </StaticRouter>
        )
      );

      const [linkTags, styleTags, scriptTags] = [
        extractor.getScriptTags(),
        extractor.getStyleTags(),
        extractor.getScriptTags()
      ];

      const initialDataScript = `
      <script>window.__INITIAL_STATE__=${JSON.stringify(data)}</script>
    `.trim();

      res.render('index', {
        htmlWebpackPlugin: {
          options: {
            title: 'React App',
            scriptTags: initialDataScript + scriptTags,
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

server.listen(3000, () => logger.info('App listening on port 3000!'));
