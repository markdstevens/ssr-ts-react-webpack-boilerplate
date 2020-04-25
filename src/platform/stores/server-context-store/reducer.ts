import { ServerContextState } from './store';
import { Dispatch } from 'react';

/**
 * Defines return type of useReducer hook
 */
export type ServerContextStoreReducer = [ServerContextState, Dispatch<ServerContextState>];
