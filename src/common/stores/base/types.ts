import {Dispatch} from 'react';

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

export interface Store<T> {
  CustomProvider: React.FunctionComponent<IProvider<T>>;
  useCustomState: () => Reducer<T>;
  reducer: ReducerFunc<T, T>;
}
