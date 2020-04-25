import { ServerContextStore } from 'platform/stores/server-context-store';
import { StoreMap } from 'platform/stores/types';
import { LocalizationStore } from 'platform/stores/localization-store';

export function initPlatformClientStoers(serializedData: StoreMap): StoreMap {
  return {
    serverContextStore: new ServerContextStore(serializedData.serverContextStore.state),
    localizationStore: new LocalizationStore(serializedData.localizationStore.state)
  };
}
