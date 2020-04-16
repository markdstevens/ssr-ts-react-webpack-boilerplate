import { NameStoreState } from './store';
import { Reducer } from 'stores/types';

/**
 * Defines return type of useReducer hook
 */
export type NameStoreReducer = Reducer<NameStoreState>;
