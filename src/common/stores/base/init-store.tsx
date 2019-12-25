import React, {createContext, useReducer, useContext} from 'react';
import {Store, IProvider, Reducer} from 'stores/base';

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
      children,
    }: IProvider<T>): JSX.Element => (
      <CustomContext.Provider value={ useReducer(reducer, initialState) }>
        {children}
      </CustomContext.Provider>
    ),
    useCustomState: (): Reducer<T> => {
      return (useContext(CustomContext) as Reducer<T>);
    },
    reducer: (prevState: T, nextState: T) =>
      Object.assign({}, prevState, nextState),
  };
  store.CustomProvider.displayName = 'CustomProvider';
  return store;
}
