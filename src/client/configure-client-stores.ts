import { Stores, StoreMap } from 'stores/types';
import { initCustomClientStores } from './init-custom-client-stores';
import { initPlatformStores } from './init-platform-stores';

export function configureClientStores(serializedStores: { stores: StoreMap }): Stores {
  const stores = {
    ...initCustomClientStores(serializedStores.stores),
    ...initPlatformStores(serializedStores.stores)
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
