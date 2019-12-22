import React, { createContext, useContext } from 'react';
import { Route } from 'react-router-dom';
import { routes } from 'routes';
import { GenericState } from 'stores/base';

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
  const data: GenericState = useContext(InitialContext)
  return isInitialRender() ? data : null;
};

export const App: React.FunctionComponent<GenericState> = ({ data }: GenericState) => {
  return (
    <InitialContext.Provider value={data}>
      {routes.map(({ path, exact, component: Page }) => (
        <Route
          key={path}
          {...{ path, exact }}
          component={Page}
        />
      ))}
    </InitialContext.Provider>
  );
};
App.displayName = 'App';
