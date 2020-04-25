import { baseRoute, Controller, staticView, staticRoute } from 'platform/controllers';
import loadable from '@loadable/component';

@baseRoute('/')
export class AboutController extends Controller {
  @staticRoute('/about')
  @staticView(loadable(() => import('../views/about')))
  public aboutPage: any;
}
