import { LocalizationStoreReducer } from './reducer';
import { useContext } from 'react';
import { LocalizationStoreContext } from './context';

export const useLocalizationStore = (): LocalizationStoreReducer =>
  useContext<LocalizationStoreReducer>(LocalizationStoreContext);
