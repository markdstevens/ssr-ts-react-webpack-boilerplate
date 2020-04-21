import { createContext } from 'react';
import { LocalizationStoreReducer } from './reducer';

export const LocalizationStoreContext = createContext<LocalizationStoreReducer>({} as LocalizationStoreReducer);
export const LocalizationStoreProvider = LocalizationStoreContext.Provider;
