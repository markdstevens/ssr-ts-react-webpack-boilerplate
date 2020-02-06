import { GenericState } from 'utils/store';

interface ServiceWorkerRoute {
  url: string;
  revision: string;
}

declare global {
  const __DEV__: boolean;
  const __BROWSER__: boolean;
  interface Window {
    __precacheManifest: ServiceWorkerRoute[];
    __INITIAL_STATE__: GenericState;
  }
}
