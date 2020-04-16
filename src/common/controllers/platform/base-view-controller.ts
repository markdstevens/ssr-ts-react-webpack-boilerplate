import { BaseController } from './base-controller';
import { ControllerType } from './ControllerType';
import { ViewController } from './view-controller';
import { dataView } from 'hocs/DataView';
import { ControllerView, DataViewHocResponse, StatelessView } from 'common/views/types';

export abstract class BaseViewController extends BaseController implements ViewController {
  public abstract path: string;
  public abstract exact: boolean;
  public abstract view: ControllerView;

  public type = ControllerType.VIEW;

  public get component(): DataViewHocResponse | StatelessView {
    return this.isStateful ? dataView(this) : (this.view as StatelessView);
  }
}
