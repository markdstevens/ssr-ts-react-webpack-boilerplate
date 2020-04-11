import { Controller } from './types';
import HomeController from './home-controller';

export const controllers: Controller[] = [new HomeController().init()];
