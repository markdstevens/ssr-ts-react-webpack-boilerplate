import autoBind from 'auto-bind';
import { controllerRegistry } from './controller-registry';
import { logger } from 'platform/utils/logger';
import { Event } from 'platform/utils/event';

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
    } else {
      logger.event(
        Event.CONTROLLER_NOT_INITIALIZED,
        `no controller in the controller registry matches ${this.path}`,
        {
          path: this.path
        }
      );
    }
  }
}
