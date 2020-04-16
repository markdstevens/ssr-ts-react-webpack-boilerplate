import { TodoState } from './store';
import { Reducer } from 'stores/types';

/**
 * Defines return type of useReducer hook
 */
export type TodoStoreReducer = Reducer<TodoState>;
