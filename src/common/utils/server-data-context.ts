import { createContext } from 'react';
import { GenericState } from 'utils/store';

export const ServerDataContext = createContext<GenericState>({ data: null });
ServerDataContext.displayName = 'ServerDataContext';
