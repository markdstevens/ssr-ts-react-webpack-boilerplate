import React, { createContext, useContext, useReducer } from 'react';
import { Dispatch, FunctionComponent, ReactNode } from 'react';

export interface State<T> {
  data?: T | null;
}

export type GenericState = State<any>;
export type Reducer<T> = [T, Dispatch<T>];
export type ReducerFunc<T, R> = (previousState: T, action: R) => T;

export interface StoreProvider<T> {
  reducer: ReducerFunc<T, T>;
  initialState: T;
  children: ReactNode;
}

export interface Store<T = any> {
  StoreContextProvider: FunctionComponent<StoreProvider<T>>;
  useCustomState: () => Reducer<T>;
  reducer: ReducerFunc<T, T>;
}

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
  const StoreContext = createContext<Partial<T | Reducer<T>>>({});
  StoreContext.displayName = 'StoreContext';

  const store: Store<T> = {
    StoreContextProvider: ({ reducer, initialState, children }: StoreProvider<T>): JSX.Element => (
      <StoreContext.Provider value={useReducer(reducer, initialState)}>
        {children}
      </StoreContext.Provider>
    ),
    useCustomState: (): Reducer<T> => useContext(StoreContext) as Reducer<T>,
    reducer: (prev: T, next: T) => Object.assign({}, prev, next)
  };
  store.StoreContextProvider.displayName = 'StoreContextProvider';
  return store;
}
