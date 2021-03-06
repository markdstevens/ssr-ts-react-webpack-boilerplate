import { Dispatch } from 'react';

export interface Store<T = any> {
  state: T;
  updateState(prevState: T, nextState: T): T;
  dispatch: Dispatch<T>;
}

export interface StoreMap<T = any> {
  [key: string]: Store<T>;
}

export interface Stores {
  stores: StoreMap;
  get<T>(storeName: string): T;
}

export type Reducer<State = any> = [State, Dispatch<State>];
