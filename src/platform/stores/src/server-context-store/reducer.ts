import { Dispatch } from 'react';
import { ServerContextState } from './store';

/**
 * Defines return type of useReducer hook
 */
export type ServerContextStoreReducer = [ServerContextState, Dispatch<ServerContextState>];
