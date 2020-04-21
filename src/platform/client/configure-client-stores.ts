import { Stores, StoreMap } from 'platform/stores/types';
import { initCustomClientStores } from 'platform/client/init-custom-client-stores';
import { initPlatformClientStoers } from 'platform/client';

export function configureClientStores(serializedStores: { stores: StoreMap }): Stores {
  const stores = {
    ...initCustomClientStores(serializedStores.stores),
    ...initPlatformClientStoers(serializedStores.stores)
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
