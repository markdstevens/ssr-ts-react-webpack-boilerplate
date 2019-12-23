import React from 'react';
import path from 'path';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { App } from 'components/App';
import { StaticRouter, matchPath } from 'react-router-dom';
import { routes, IRoute } from 'routes';
import { GenericState } from 'stores/base';
import { ChunkExtractor } from '@loadable/server'

const statsFile = path.resolve('dist/loadable-stats.json');

const server = express();
server.use(express.static('dist'));

server.get("*", (req, res, next) => {
  const extractor = new ChunkExtractor({ statsFile })

  const activeRoute: IRoute | null = routes.find(route => matchPath(req.url, route)) || null;

  const promise: Promise<GenericState | void> = activeRoute?.fetchInitialData
    ? activeRoute.fetchInitialData(req)
    : Promise.resolve();

  promise.then((data: GenericState | void) => {
    const tsx = extractor.collectChunks(
      <StaticRouter location={req.url}>
        <App data={data}/>
      </StaticRouter>
    );

    const html = renderToString(tsx);
    const scriptTags = extractor.getScriptTags();

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>React TS App</title>
          <meta charset="utf-8" />
          <link rel="icon" href="data:," />
        </head>
        <body style="margin:0">
          <div id="app">${html}
          </div>
        </body>
        <script>window.__INITIAL_STATE__=${JSON.stringify(data)}</script>
        ${scriptTags}
      </html>
    `);
  }).catch(next)
});

server.listen(3000, () => console.log('App listening on port 3000!'));
