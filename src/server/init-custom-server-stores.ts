import { StoreMap } from 'stores/types';
import { TodoStore } from 'stores/todo-store';

export function initCustomServerStores(): StoreMap {
  return {
    todoStore: new TodoStore({})
  };
}
