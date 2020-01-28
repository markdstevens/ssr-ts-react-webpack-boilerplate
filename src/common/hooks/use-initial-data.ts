import { createContext, useContext } from 'react';
import { GenericState } from 'stores/base';

const InitialContext = createContext(null);

export const useInitialData = (): GenericState | null =>
  useContext(InitialContext);
