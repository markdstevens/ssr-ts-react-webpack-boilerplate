import { Dispatch } from 'react';
import { LocalizationState } from './store';

/**
 * Defines return type of useReducer hook
 */
export type LocalizationStoreReducer = [LocalizationState, Dispatch<LocalizationState>];
