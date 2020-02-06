import loadable from '@loadable/component';
import { BaseController } from 'controllers';

export class HomeController extends BaseController {
  public component = loadable(() => import('../pages/home'));
  public path = '/home';
}
