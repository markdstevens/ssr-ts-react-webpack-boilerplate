import { BaseController } from 'controllers/base-controller';
import loadable from '@loadable/component';

export default class HomeController extends BaseController {
  public path = '/hello';
  public component = loadable(() => import('../pages/home'));
}
