import { Controller } from './controller';
import { ControllerView } from 'common/views/types';

export interface ViewController extends Controller {
  view: ControllerView;
}
