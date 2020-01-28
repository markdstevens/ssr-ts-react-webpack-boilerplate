import React, { FunctionComponent, Profiler, StrictMode } from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes } from 'routes';
import { GenericState } from 'stores/base';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { logger } from 'utils/logger';
import { InitialContext } from 'utils/server-data-context';

export const App: FunctionComponent<GenericState> = ({
  data: initialServerData
}: GenericState) => (
  <StrictMode>
    <main>
      <InitialContext.Provider value={initialServerData}>
        <Switch>
          {routes.map(({ path, exact, component: Page, name }) => (
            <Route
              key={name}
              path={path}
              exact={exact}
              component={(props: any): JSX.Element => (
                <ErrorBoundary>
                  <Profiler id={name} onRender={logger.profile}>
                    <Page {...props} />
                  </Profiler>
                </ErrorBoundary>
              )}
            />
          ))}
        </Switch>
      </InitialContext.Provider>
    </main>
  </StrictMode>
);

App.displayName = 'App';
