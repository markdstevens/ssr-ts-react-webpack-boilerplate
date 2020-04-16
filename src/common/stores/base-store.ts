import { Store } from './types';

export abstract class BaseStore<T> implements Store<T> {
  public state: T = {} as T;

  public abstract fetch(...args: any[]): Promise<void>;

  constructor(initialState: T) {
    this.state = initialState;
    this.updateState = this.updateState.bind(this);
  }

  public updateState(prevState: T, nextState: T): T {
    this.state = Object.assign({}, prevState, nextState);
    return this.state;
  }
}
