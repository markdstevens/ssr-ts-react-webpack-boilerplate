import React, { Dispatch, createContext, useReducer, useContext } from 'react';
import axios from 'axios';

export interface IState<T> {
  data?: T;
}

export type GenericState = IState<any>;

export type Reducer<T> = [T, Dispatch<T>]
export type ReducerFunc<T, R> = (previousState: T, action: R) => T

export interface IProvider<T> {
  reducer: ReducerFunc<T, T>;
  initialState: T;
  children: React.ReactNode;
}

export async function fetchWrapper<T>(url: string): Promise<GenericState> {
  try {
    const data = await axios.get<T>(url);
    if (data?.data) {
      return {
        data: data.data
      };
    }
  } catch (e) {
    console.error(`request failed: ${url}`);
  }
};

export interface Store<T> {
  CustomProvider: React.FunctionComponent<IProvider<T>>;
  useCustomState: () => Reducer<T>;
  reducer: ReducerFunc<T, T>;
}

export function initStore<T>(reducer: ReducerFunc<T, T>): Store<T> {
  const CustomContext = createContext<Partial<T | Reducer<T>>>({});

  const store: Store<T> = {
    CustomProvider: ({
      reducer,
      initialState,
      children
    }: IProvider<T>): JSX.Element => (
      <CustomContext.Provider value={ useReducer(reducer, initialState) }>
        {children}
      </CustomContext.Provider>
    ),
    useCustomState: (): Reducer<T> => {
      return (useContext(CustomContext) as Reducer<T>)
    },
    reducer
  };
  store.CustomProvider.displayName = 'CustomProvider';
  return store;
}
