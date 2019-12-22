import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { App } from 'components/App';
import { StaticRouter, matchPath } from 'react-router-dom';
import { routes, IRoute } from 'routes';
import { GenericState } from 'stores/base';

const server = express();
server.use(express.static('dist'));

server.get("*", (req, res, next) => {
  const activeRoute: IRoute | null = routes.find(route => matchPath(req.url, route)) || null;

  const promise: Promise<GenericState | void> = activeRoute?.fetchInitialData
    ? activeRoute.fetchInitialData(req)
    : Promise.resolve();

  promise.then((data: GenericState | void) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>React TS App</title>
          <meta charset="utf-8" />
          <link rel="icon" href="data:," />
        </head>
        <body style="margin:0">
          <div id="app">${renderToString(
            <StaticRouter location={req.url}>
              <App data={data}/>
            </StaticRouter>
          )}
          </div>
        </body>
        <script>window.__INITIAL_STATE__=${JSON.stringify(data)}</script>
        <script src="/vendors~main.bundle.js"></script>
        <script src="/client.js" defer></script>
      </html>
    `);
  }).catch(next)
});

server.listen(3000, () => console.log('App listening on port 3000!'));
