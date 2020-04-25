import { Controller } from 'platform/controllers/controller';
import { AboutController } from 'controllers/about-controller';
import { HomeController } from 'controllers/home-controller';
import { NameController } from 'controllers/name-controller';

export const initControllers = (): Controller[] => [
  new AboutController('AboutController'),
  new HomeController('HomeController'),
  new NameController('NameController')
];
