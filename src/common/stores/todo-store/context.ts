import { createContext } from 'react';
import { TodoStoreReducer } from './reducer';

export const TodoStoreContext = createContext<TodoStoreReducer>({} as TodoStoreReducer);
export const TodoStoreProvider = TodoStoreContext.Provider;
