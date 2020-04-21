import { BaseController } from './base-controller';
import { ControllerType } from './ControllerType';
import { ViewController } from './view-controller';
import { dataView } from 'platform/hocs/DataView';
import { ControllerView } from 'common/views/types';
import { ControllerActionMetaData } from './controller-meta-data';

export abstract class BaseViewController extends BaseController implements ViewController {
  public abstract readonly view: ControllerView;

  public path = '/error';

  public readonly exact = true;
  public readonly type = ControllerType.VIEW;

  public get actionDetails(): ControllerActionMetaData[] {
    const controllerActionMetaData: ControllerActionMetaData[] = [];
    Object.keys(this)
      .map(key => Object.getOwnPropertyDescriptor(this, key)?.value?.name)
      .filter(methodOrProperty => methodOrProperty?.includes('__API_METHOD__'))
      .map(method => method.split('|'))
      .forEach(methodMetaData => {
        const [, , methodPath] = methodMetaData;
        methodPath.split(',').forEach((method: string) => {
          controllerActionMetaData.push({
            controller: this,
            action: `${this.path}${method}`,
            View: dataView(this)
          });
        });
      });

    return controllerActionMetaData;
  }
}
