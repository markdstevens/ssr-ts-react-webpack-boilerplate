import { Store } from './types';
import autoBind from 'auto-bind';
import { bindProxyHandler } from 'platform/utils/store-state-proxy';

export abstract class BaseStore<T> implements Store<T> {
  public state: T;
  private getProxy: (state: T) => T;

  constructor(initialState: T) {
    autoBind(this);
    this.getProxy = bindProxyHandler((newState: T) => this.dispatch(newState));
    this.state = this.getProxy(initialState);
  }

  public updateState(prevState: T, nextState: T): T {
    this.state = this.getProxy(Object.assign({}, prevState, nextState));
    return this.state;
  }

  public dispatch(newState: T): void {
    /* is overriden in StoreProviders.tsx  */
  }
}
