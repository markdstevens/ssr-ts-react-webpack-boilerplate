import { LocalizationState } from './store';
import { Dispatch } from 'react';

/**
 * Defines return type of useReducer hook
 */
export type LocalizationStoreReducer = [LocalizationState, Dispatch<LocalizationState>];
