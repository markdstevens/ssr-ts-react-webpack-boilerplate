import React, { FunctionComponent, Profiler } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'platform/common/ErrorBoundary';
import { logger } from 'platform/utils/logger';
import { PageWrapper } from 'platform/common/PageWrapper';
import { Stores } from 'platform/stores/types';
import { StoreProviders } from 'platform/common/StoreProviders';
import { ViewController } from 'platform/controllers/view-controller';

interface AppProps {
  stores: Stores;
  controllers: ViewController[];
}

export const App: FunctionComponent<AppProps> = ({ stores, controllers }: AppProps) => (
  <StoreProviders stores={stores}>
    <PageWrapper>
      <Switch>
        {controllers
          .map(controller => controller.actionDetails)
          .map(controllerActionMetaDataList =>
            controllerActionMetaDataList.map(({ action, controller, View }) => (
              <Route
                key={action}
                path={action}
                exact={true}
                render={(): JSX.Element => (
                  <ErrorBoundary>
                    <Profiler id={action} onRender={logger.profile}>
                      <View controller={controller} />
                    </Profiler>
                  </ErrorBoundary>
                )}
              />
            ))
          )}
      </Switch>
    </PageWrapper>
  </StoreProviders>
);
App.displayName = 'App';
