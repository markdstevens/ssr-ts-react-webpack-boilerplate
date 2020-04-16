import { createContext } from 'react';
import { ServerContextStoreReducer } from './reducer';

export const ServerContextStoreContext = createContext<ServerContextStoreReducer>({} as ServerContextStoreReducer);
export const ServerContextStoreProvider = ServerContextStoreContext.Provider;
