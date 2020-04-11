import React, { FunctionComponent, Profiler } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GenericState } from 'utils/store';
import { controllers } from 'controllers';
import { ErrorBoundary } from 'components/common/ErrorBoundary';
import { logger } from 'utils/logger';
import { ServerDataContext } from 'utils/server-data-context';
import { RouteComponentProps } from 'react-router-dom';
import { PageWrapper } from './PageWrapper';

export const App: FunctionComponent<GenericState> = ({ data: initialServerData }) => (
  <PageWrapper>
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
  </PageWrapper>
);
App.displayName = 'App';
