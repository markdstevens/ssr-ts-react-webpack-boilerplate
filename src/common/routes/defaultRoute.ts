import loadable from '@loadable/component';
import {Route} from './types';

export const defaultRoute: Route = {
  name: 'default',
  component: loadable(() => import('../pages/home'))
};
