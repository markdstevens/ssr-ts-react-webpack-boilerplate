import { Controller } from './controller';
import { ControllerView, DataViewHocResponse, StatelessView } from 'common/views/types';

export interface ViewController extends Controller {
  view: ControllerView;
  component: StatelessView | DataViewHocResponse;
}
