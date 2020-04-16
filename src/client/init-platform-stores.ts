import { ServerContextStore } from 'stores/platform/server-context-store';
import { StoreMap } from 'stores/types';
import { LocalizationStore } from 'stores/platform/localization-store';

export function initPlatformStores(serializedData: StoreMap): StoreMap {
  return {
    serverContextStore: new ServerContextStore(serializedData.serverContextStore.state),
    localizationStore: new LocalizationStore(serializedData.localizationStore.state)
  };
}
