import loadable from '@loadable/component';
import { BaseViewController } from './platform/base-view-controller';
import { TodoStore } from 'stores/todo-store';
import { FetchOptions } from './platform/controller';

export class TodoController extends BaseViewController {
  public path = '/todo/:id';
  public exact = true;
  public view = loadable(() => import('../views/todo'));

  public async fetch({ stores }: FetchOptions): Promise<void> {
    const todoStore = stores.get<TodoStore>('todoStore');

    await todoStore.fetch();
  }
}
