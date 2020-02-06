import { Controller } from './types';
import { HomeController } from './home';

const controllers: Controller[] = [HomeController].map(PageController =>
  new PageController().init()
);

export { controllers };
