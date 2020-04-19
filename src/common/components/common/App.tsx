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
  <StoreProviders stores={stores} controllers={controllers}>
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
