import {GenericState} from 'stores/base';

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}
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

/**
 * made this file a module
 */
export {};
