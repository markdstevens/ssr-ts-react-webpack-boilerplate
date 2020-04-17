import { BaseController } from './base-controller';
import { ControllerType } from './ControllerType';
import { ViewController } from './view-controller';
import { dataView } from 'hocs/DataView';
import { ControllerView, DataViewHocResponse, StatelessView } from 'common/views/types';

export abstract class BaseViewController extends BaseController implements ViewController {
  public abstract readonly path: string;
  public abstract readonly view: ControllerView;

  public readonly exact = true;
  public readonly type = ControllerType.VIEW;

  public get component(): DataViewHocResponse | StatelessView {
    return this.isStateful ? dataView(this) : (this.view as StatelessView);
  }
}
