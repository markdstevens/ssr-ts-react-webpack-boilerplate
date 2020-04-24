import React, { FunctionComponent, useReducer, ReactNode, useEffect } from 'react';
import { Stores } from 'platform/stores/types';
import {
  ServerContextStoreProvider,
  ServerContextStore
} from 'platform/stores/server-context-store';
import { AllStoreContextProvider } from 'platform/stores/all-store-context';
import { LocalizationStoreProvider, LocalizationStore } from 'platform/stores/localization-store';
import { debounce } from 'platform/utils/debounce';
import { NameStore } from 'stores/name-store';
import { NameStoreProvider } from 'platform/stores/name-store/context';

interface StoresProps {
  stores: Stores;
  children: ReactNode;
}

export const StoreProviders: FunctionComponent<StoresProps> = ({
  children,
  stores
}: StoresProps) => {
  const serverContextStore = stores.get<ServerContextStore>('serverContextStore');
  const localizationStore = stores.get<LocalizationStore>('localizationStore');

  const serverContextStoreReducer = useReducer(
    serverContextStore.updateState,
    serverContextStore.state
  );
  const localizationStoreReducer = useReducer(
    localizationStore.updateState,
    localizationStore.state
  );

  const nameStore = stores.get<NameStore>('nameStore');
  const nameStoreReducer = useReducer(nameStore.updateState, nameStore.state);
  useEffect(() => {
    nameStore.dispatch = debounce(nameStoreReducer[1], 10);
  });
  return (
    <AllStoreContextProvider value={stores}>
      <ServerContextStoreProvider value={serverContextStoreReducer}>
        <LocalizationStoreProvider value={localizationStoreReducer}>
          <NameStoreProvider value={nameStoreReducer}>{children}</NameStoreProvider>
        </LocalizationStoreProvider>
      </ServerContextStoreProvider>
    </AllStoreContextProvider>
  );
};
