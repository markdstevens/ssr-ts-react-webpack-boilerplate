import { baseRoute, route, view, Controller, FetchOptions } from 'platform/controllers';
import loadable from '@loadable/component';
import { logger } from 'platform/utils/logger';

@baseRoute('/name')
export class NameController extends Controller {
  @route('/')
  @view(loadable(() => import('../views/name')))
  public async names(fetchOptions: FetchOptions): Promise<void> {
    logger.info(fetchOptions);
  }

  @route('/search/:name', '/blah')
  @view(loadable(() => import('../views/findName')))
  public async findName(fetchOptions: FetchOptions): Promise<void> {
    logger.info(fetchOptions);
  }
}
