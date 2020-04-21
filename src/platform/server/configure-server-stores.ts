import { Request } from 'express';
import { Stores } from 'platform/stores/types';
import { initCustomServerStores } from 'platform/server/init-custom-server-stores';
import { initPlatformStores } from 'platform/server';

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
