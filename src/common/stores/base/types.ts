import { Dispatch, FunctionComponent, ReactNode } from 'react';

export interface State<T> {
  data?: T | null;
}

export type GenericState = State<any>;
export type Reducer<T> = [T, Dispatch<T>];
export type ReducerFunc<T, R> = (previousState: T, action: R) => T;

export interface RouteProvider<T> {
  reducer: ReducerFunc<T, T>;
  initialState: T;
  children: ReactNode;
}

export interface Store<T> {
  CustomProvider: FunctionComponent<RouteProvider<T>>;
  useCustomState: () => Reducer<T>;
  reducer: ReducerFunc<T, T>;
}
