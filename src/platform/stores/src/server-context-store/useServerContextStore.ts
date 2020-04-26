import { useContext } from 'react';
import { ServerContextStoreReducer } from './reducer';
import { ServerContextStoreContext } from './context';

export const useServerContextStore = (): ServerContextStoreReducer =>
  useContext<ServerContextStoreReducer>(ServerContextStoreContext);
