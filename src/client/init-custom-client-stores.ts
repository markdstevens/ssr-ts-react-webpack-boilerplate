import { StoreMap } from 'stores/types';
import { TodoStore } from 'stores/todo-store';

export function initCustomClientStores(serializedStores: StoreMap): StoreMap {
  return {
    todoStore: new TodoStore(serializedStores.todoStore.state)
  };
}
