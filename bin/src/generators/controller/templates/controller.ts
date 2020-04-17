export const statelessController = (
  pascalCaseControllerName: string,
  path: string,
  viewName: string
) => `import loadable from '@loadable/component';
import { BaseViewController } from 'controllers/platform/base-view-controller';

export class ${pascalCaseControllerName} extends BaseViewController {
  public readonly path = '${path}';
  public readonly view = loadable(() => import('../views/${viewName}'));
}
`;

export const statefulController = (
  pascalCaseControllerName: string,
  path: string,
  viewName: string
) => `import loadable from '@loadable/component';
import { BaseViewController } from 'controllers/platform/base-view-controller';
import { FetchOptions } from 'controllers/platform/controller';
import { ServerContextStore } from 'stores/platform/server-context-store';

export class ${pascalCaseControllerName} extends BaseViewController {
  public readonly path = '${path}';
  public readonly view = loadable(() => import('../views/${viewName}'));

  /**
   * This method will be called from the server whenever a user requests for 
   * ${path}. This method will also be called on the client when react router 
   * matches ${path}.
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
`;

export const controller = (isStateful: boolean, pascalCaseControllerName: string, path: string, viewName: string) =>
  isStateful
    ? statefulController(pascalCaseControllerName, path, viewName)
    : statelessController(pascalCaseControllerName, path, viewName);
