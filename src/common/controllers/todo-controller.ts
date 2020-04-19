import loadable from '@loadable/component';
import { baseRoute, route, BaseViewController, FetchOptions } from 'controllers/platform';
import { TodoStore } from 'stores/todo-store';

@baseRoute('/todo')
export class TodoController extends BaseViewController {
  public readonly view = loadable(() => import('../views/todo'));

  @route('/')
  public todos(): Promise<void> {
    return Promise.resolve();
  }

  @route('/show/:id', '/showa/:id')
  public async editTodo(fetchOptions: FetchOptions): Promise<void> {
    const todoStore = fetchOptions.stores.get<TodoStore>('todoStore');
    await todoStore.fetch();
  }
}
