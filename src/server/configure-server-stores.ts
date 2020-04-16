import { Request } from 'express';
import { Stores } from 'stores/types';
import { initCustomServerStores } from './init-custom-server-stores';
import { initPlatformStores } from './init-platform-stores';

export function configureServerStores(req: Request): Stores {
  const stores = {
    ...initCustomServerStores(),
    ...initPlatformStores(req)
  };

  return Object.assign(
    {},
    {
      stores,
      get: function<T>(storeName: string): T {
        return (this.stores[storeName] as unknown) as T;
      }
    }
  );
}
