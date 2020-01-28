import loadable from '@loadable/component';
import { Route } from './types';

export const homeRoute: Route = {
  name: 'home',
  path: '/',
  exact: true,
  component: loadable(() => import('../pages/home'))
};
