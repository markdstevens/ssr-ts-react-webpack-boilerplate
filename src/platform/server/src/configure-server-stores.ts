import { Request } from 'express';
import { Stores } from 'platform/stores';
import { initCustomServerStores, initPlatformStores } from 'platform/server';

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
