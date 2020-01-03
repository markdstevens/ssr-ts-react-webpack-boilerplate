import React, {
  createContext,
  useContext,
  FunctionComponent,
  Profiler,
  StrictMode
} from 'react';
import {Route, Switch} from 'react-router-dom';
import {routes} from 'routes';
import {GenericState} from 'stores/base';
import {ErrorBoundary} from 'components/ErrorBoundary';
import {logger} from 'utils/logger';

const initialRender = (initial: boolean): () => boolean => {
  let initialRender = initial;
  return (): boolean => {
    const val = initialRender;
    initialRender = false;
    return val;
  };
};

const isInitialRender = initialRender(true);

const InitialContext = createContext(null);
export const useInitialData = (): GenericState | null => {
  const data: GenericState | null = useContext(InitialContext);
  return isInitialRender() ? data : null;
};

export const App: FunctionComponent<GenericState> = ({data}: GenericState) => (
  <StrictMode>
    <main>
      <InitialContext.Provider value={data}>
        <Switch>
          {routes.map(({path, exact, component: Page, name}) => (
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
