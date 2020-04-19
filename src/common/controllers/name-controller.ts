import loadable from '@loadable/component';
import { baseRoute, route, BaseViewController } from 'controllers/platform';

@baseRoute('/name')
export class NameController extends BaseViewController {
  public readonly view = loadable(() => import('../views/name'));

  @route('/')
  public names(): Promise<void> {
    return Promise.resolve();
  }

  @route('/search/:name')
  public findName(): Promise<void> {
    return Promise.resolve();
  }
}
