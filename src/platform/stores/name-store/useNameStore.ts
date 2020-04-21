import { NameStoreReducer } from './reducer';
import { useContext } from 'react';
import { NameStoreContext } from './context';

export const useNameStore = (): NameStoreReducer => useContext<NameStoreReducer>(NameStoreContext);
