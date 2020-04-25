import { ServerContextStore, ServerContextState } from 'platform/stores/server-context-store';
import { LocalizationStore, LocalizationState } from 'platform/stores/localization-store';
import { StoreMap } from 'platform/stores/types';
import { Request } from 'express';

interface ExpressLocale {
  locale: {
    language: string;
    region: string;
  };
}

export function initPlatformStores(request: Request): StoreMap {
  const req = request as Request & ExpressLocale;
  const serverContextStoreState: ServerContextState = {
    location: req.path,
    language: req.locale.language,
    region: req.locale.region,
    locale: `${req.locale.language}-${req.locale.region}`,
    isServerLoad: true
  };

  return {
    serverContextStore: new ServerContextStore({ ...serverContextStoreState }),
    localizationStore: new LocalizationStore({} as LocalizationState)
  };
}
