import autoBind from 'auto-bind';
import { controllerRegistry } from './controller-registry';

export abstract class Controller {
  [key: string]: any;
  public path = '';

  constructor(name: string) {
    autoBind(this);

    const controller = controllerRegistry.findControllerByControllerName(name);
    if (controller) {
      controller.instance = this;
      controller?.actions.forEach(action => {
        action.method = controller.instance?.[action.name];
      });
    }
  }
}
