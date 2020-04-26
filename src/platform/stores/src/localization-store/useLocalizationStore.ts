import { useContext } from 'react';
import { LocalizationStoreReducer } from './reducer';
import { LocalizationStoreContext } from './context';

export const useLocalizationStore = (): LocalizationStoreReducer =>
  useContext<LocalizationStoreReducer>(LocalizationStoreContext);
