import { ServerContextStoreReducer } from './reducer';
import { useContext } from 'react';
import { ServerContextStoreContext } from './context';

export const useServerContextStore = (): ServerContextStoreReducer =>
  useContext<ServerContextStoreReducer>(ServerContextStoreContext);
