import { StoreMap } from 'platform/stores';
import { NameStore } from 'stores/name-store';

export function initCustomClientStores(serializedStores: StoreMap): StoreMap {
  return {
    nameStore: new NameStore(serializedStores.nameStore.state)
  };
}
