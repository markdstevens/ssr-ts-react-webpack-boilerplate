import loadable from '@loadable/component';
import { Route } from './types';

export const homeRoute: Route = {
  name: 'default',
  component: loadable(() => import('../pages/home'))
};
