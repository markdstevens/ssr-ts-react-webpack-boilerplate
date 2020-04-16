import { TodoStoreReducer } from './reducer';
import { useContext } from 'react';
import { TodoStoreContext } from './context';

export const useTodoStore = (): TodoStoreReducer => useContext<TodoStoreReducer>(TodoStoreContext);
