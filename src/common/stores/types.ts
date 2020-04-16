import { Dispatch } from 'react';

export interface Store<T = any> {
  fetch: (...args: any[]) => Promise<void>;
  state: T;
  updateState(prevState: T, nextState: T): T;
}

export interface StoreMap<T = any> {
  [key: string]: Store<T>;
}

export interface Stores {
  stores: StoreMap;
  get<T>(storeName: string): T;
}

export type Reducer<State = any> = [State, Dispatch<State>];
