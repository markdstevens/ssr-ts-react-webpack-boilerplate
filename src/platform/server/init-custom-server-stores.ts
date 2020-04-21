import { StoreMap } from 'platform/stores/types';
import { NameStore } from 'stores/name-store';

export function initCustomServerStores(): StoreMap {
  return {
    nameStore: new NameStore({} as any)
  };
}
