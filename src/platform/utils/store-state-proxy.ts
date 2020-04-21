import { Dispatch } from 'react';
import { logger } from './logger';

type StringIndexable = {
  [key: string]: any;
};

const getProxyHandler = <T extends StringIndexable>(state: T, dispatch: Dispatch<T>): ProxyHandler<T> => {
  const handler = {
    get(target: T, key: string | number): any {
      if (key === '__IS_PROXY__') {
        return true;
      }

      if (typeof target[key] === 'object' && target[key] !== null && !target[key].__IS_PROXY__) {
        return new Proxy(target[key], handler);
      } else {
        return target[key];
      }
    },
    set: (obj: StringIndexable, prop: string | number, value: any): boolean => {
      const propertyIsChanging = obj[prop] !== value;

      obj[prop] = value;

      if (propertyIsChanging) {
        dispatch(state);
      }

      return true;
    }
  };

  return handler;
};

export const bindProxyHandler = <T extends StringIndexable>(dispatch: Dispatch<T>): ((state: T) => T) => (
  state: T
): T => new Proxy(state, getProxyHandler(state, dispatch));
