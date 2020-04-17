import loadable from '@loadable/component';
import { BaseViewController } from 'controllers/platform/base-view-controller';
import { FetchOptions } from 'controllers/platform/controller';
import { ServerContextStore } from 'stores/platform/server-context-store';

export class TodoController extends BaseViewController {
  public readonly path = '/todo/:id';
  public readonly view = loadable(() => import('../views/todo'));

  /**
   * This method will be called from the server whenever a user requests for
   * /todo/:id. This method will also be called on the client when react router
   * matches /todo/:id.
   *
   * This method should do nothing except mutate store state. The updated store
   * state will then propagate to the UI. All the application and platform stores
   * are passed in via the fetchOptions.stores param.
   */

  public async fetch({ stores }: FetchOptions): Promise<void> {
    const serverContextStore = stores.get<ServerContextStore>('serverContextStore');

    await serverContextStore.fetch();
  }
}
