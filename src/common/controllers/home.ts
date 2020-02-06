import { BaseController } from 'controllers/base-controller';
import loadable from '@loadable/component';

export class HomeController extends BaseController {
  public path = '/home';
  public component = loadable(() => import('../pages/home'));
}
