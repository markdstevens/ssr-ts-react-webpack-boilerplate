import React, { createContext, useContext, useReducer } from 'react';
import { Reducer, RouteProvider, Store } from 'stores/base';

/**
 * @description
 *   initStore provides all the boilerplate code to setup route based providers
 *   using react hooks and context. This method essentially replaces mobx and
 *   redux as application state management solutions.
 *
 * @return {Store<T>}
 *
 */
export function initStore<T>(): Store<T> {
  const CustomContext = createContext<Partial<T | Reducer<T>>>({});

  const store: Store<T> = {
    CustomProvider: ({
      reducer,
      initialState,
      children
    }: RouteProvider<T>): JSX.Element => (
      <CustomContext.Provider value={useReducer(reducer, initialState)}>
        {children}
      </CustomContext.Provider>
    ),
    useCustomState: (): Reducer<T> => useContext(CustomContext) as Reducer<T>,
    reducer: (prev: T, next: T) => Object.assign({}, prev, next)
  };
  store.CustomProvider.displayName = 'CustomProvider';
  return store;
}
