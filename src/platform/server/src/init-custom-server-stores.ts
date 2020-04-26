import { StoreMap } from 'platform/stores';
import { NameStore } from 'stores/name-store';

export function initCustomServerStores(): StoreMap {
  return {
    nameStore: new NameStore({} as any)
  };
}
