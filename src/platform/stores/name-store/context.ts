import { createContext } from 'react';
import { NameStoreReducer } from './reducer';

export const NameStoreContext = createContext<NameStoreReducer>({} as NameStoreReducer);
export const NameStoreProvider = NameStoreContext.Provider;
