import { baseRoute, route, view, Controller } from 'platform/controllers';
import loadable from '@loadable/component';
import { logger } from 'platform/utils';

@baseRoute('/name')
export class NameController extends Controller {
  @route('/')
  @view(loadable(() => import('../views/name')))
  public async names(): Promise<void> {
    logger.info();
  }

  @route('/search/:name')
  @view(loadable(() => import('../views/findName')))
  public async findName(): Promise<void> {
    logger.info();
  }
}
