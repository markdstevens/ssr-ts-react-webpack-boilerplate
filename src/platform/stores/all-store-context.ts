import { createContext } from 'react';
import { Stores } from './types';

export const AllStoreContext = createContext<Stores>({} as Stores);
export const AllStoreContextProvider = AllStoreContext.Provider;
export const AllStoreContextConsumer = AllStoreContext.Consumer;
