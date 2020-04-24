import React, { FunctionComponent, Profiler } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'platform/common/ErrorBoundary';
import { logger } from 'platform/utils/logger';
import { PageWrapper } from 'platform/common/PageWrapper';
import { Stores } from 'platform/stores/types';
import { StoreProviders } from 'platform/common/StoreProviders';
import { controllerRegistry } from 'platform/controllers/';

interface AppProps {
  stores: Stores;
}

export const App: FunctionComponent<AppProps> = ({ stores }: AppProps) => (
  <StoreProviders stores={stores}>
    <PageWrapper>
      <Switch>
        {controllerRegistry.getActionMetaDataForReactRouter().map(({ path, View, fetch }) => (
          <Route
            key={path}
            path={path}
            exact={true}
            render={(): JSX.Element => (
              <ErrorBoundary>
                <Profiler id={path} onRender={logger.profile}>
                  {View ? <View fetch={fetch} /> : null}
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
