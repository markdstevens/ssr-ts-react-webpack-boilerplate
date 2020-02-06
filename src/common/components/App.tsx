import React, { FunctionComponent, Profiler, StrictMode } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GenericState } from 'utils/store';
import { controllers } from 'controllers';
import { ErrorBoundary } from 'components/common/ErrorBoundary';
import { logger } from 'utils/logger';
import { ServerDataContext } from 'utils/server-data-context';
import { RouteComponentProps } from 'react-router-dom';

export const App: FunctionComponent<GenericState> = ({ data: initialServerData }) => (
  <StrictMode>
    <main>
      <ServerDataContext.Provider value={initialServerData}>
        <Switch>
          {controllers.map(({ path, exact, page: Page }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              component={(props: RouteComponentProps): JSX.Element => (
                <ErrorBoundary>
                  <Profiler id={path} onRender={logger.profile}>
                    <Page {...props} />
                  </Profiler>
                </ErrorBoundary>
              )}
            />
          ))}
        </Switch>
      </ServerDataContext.Provider>
    </main>
  </StrictMode>
);
App.displayName = 'App';
