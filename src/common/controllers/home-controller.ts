import { Controller, baseRoute, staticView, staticRoute } from 'platform/controllers';
import loadable from '@loadable/component';

@baseRoute('/')
export class HomeController extends Controller {
  @staticRoute('/home')
  @staticView(loadable(() => import('../views/home')))
  public home: any;
}
