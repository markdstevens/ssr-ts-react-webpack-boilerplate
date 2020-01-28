import { createContext } from 'react';
import { GenericState } from 'stores/base';

export const InitialContext = createContext<GenericState>({ data: null });
