import { PokemonController } from './pokemon-controller';
import { HomeController } from './home-controller';
import { Controller } from './types';
import { JokeController } from './joke-controller';

const controllers: Controller[] = [
  PokemonController,
  HomeController,
  JokeController
].map(PageController => new PageController().init());

export { controllers };
