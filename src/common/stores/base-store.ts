import { Store } from './types';
import autoBind from 'auto-bind';

export abstract class BaseStore<T> implements Store<T> {
  public state: T;

  public abstract fetch(...args: any[]): Promise<void>;

  constructor(initialState: T) {
    autoBind(this);
    this.state = new Proxy(initialState, this.setupProxy());
  }

  public updateState(prevState: T, nextState: T): T {
    this.state = new Proxy(Object.assign({}, prevState, nextState), this.setupProxy());
    return this.state;
  }

  public dispatch(newState: T): void {
    // don't delete. This method will be overriden later
  }

  private setupProxy(): object {
    const proxy = {
      set: (obj: object, prop: string, value: any): boolean => {
        const propertyAlreadyExists = prop in obj;
        const propertyIsChanging = propertyAlreadyExists && obj[prop] !== value;

        obj[prop] = value;

        if (!propertyAlreadyExists || propertyIsChanging) {
          setTimeout(() => {
            this.dispatch(this.state);
          }, 10);
        }

        return true;
      }
    };

    return proxy;
  }
}
