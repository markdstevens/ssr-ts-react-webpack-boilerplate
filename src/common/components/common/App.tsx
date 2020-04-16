import React, { FunctionComponent, Profiler } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'components/common/ErrorBoundary';
import { logger } from 'utils/logger';
import { PageWrapper } from './PageWrapper';
import { Stores } from 'stores/types';
import { StoreProviders } from 'components/common/StoreProviders';
import { ViewController } from 'controllers/platform/view-controller';

interface AppProps {
  stores: Stores;
  controllers: ViewController[];
}

export const App: FunctionComponent<AppProps> = ({ stores, controllers }: AppProps) => (
  <StoreProviders stores={stores}>
    <PageWrapper>
      <Switch>
        {controllers.map(({ path, exact, component: View }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(): JSX.Element => (
              <ErrorBoundary>
                <Profiler id={path} onRender={logger.profile}>
                  <View />
                </Profiler>
              </ErrorBoundary>
            )}
          />
        ))}
      </Switch>
    </PageWrapper>
  </StoreProviders>
);
App.displayName = 'App';
