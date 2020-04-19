import React, { FunctionComponent, useReducer, ReactNode, useEffect, useState } from 'react';
import { TodoStoreProvider, TodoStore } from 'stores/todo-store';
import { Stores } from 'stores/types';
import { ServerContextStoreProvider, ServerContextStore } from 'stores/platform/server-context-store';
import { AllStoreContextProvider } from 'stores/all-store-context';
import { LocalizationStoreProvider, LocalizationStore } from 'stores/platform/localization-store';
import { ViewController } from 'controllers/platform';

interface StoresProps {
  stores: Stores;
  children: ReactNode;
  controllers: ViewController[];
}

export const StoreProviders: FunctionComponent<StoresProps> = ({ children, stores, controllers }: StoresProps) => {
  const todoStore = stores.get<TodoStore>('todoStore');
  const serverContextStore = stores.get<ServerContextStore>('serverContextStore');
  const localizationStore = stores.get<LocalizationStore>('localizationStore');

  const todoStoreReducer = useReducer(todoStore.updateState, todoStore.state);
  const serverContextStoreReducer = useReducer(serverContextStore.updateState, serverContextStore.state);
  const localizationStoreReducer = useReducer(localizationStore.updateState, localizationStore.state);

  useEffect(() => {
    todoStore.dispatch = todoStoreReducer[1];
  });

  return (
    <AllStoreContextProvider value={stores}>
      <ServerContextStoreProvider value={serverContextStoreReducer}>
        <LocalizationStoreProvider value={localizationStoreReducer}>
          <TodoStoreProvider value={todoStoreReducer}>{children}</TodoStoreProvider>
        </LocalizationStoreProvider>
      </ServerContextStoreProvider>
    </AllStoreContextProvider>
  );
};
