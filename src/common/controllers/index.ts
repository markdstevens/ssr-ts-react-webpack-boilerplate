import { Controller } from 'platform/controllers/controller';
import { ViewController } from 'platform/controllers/view-controller';
import { ControllerType } from 'platform/controllers/ControllerType';
import { NameController } from './name-controller';

export const initControllers = (): Controller[] => [new NameController()];

export const initViewControllers = (): ViewController[] =>
  initControllers()
    .filter(controller => controller.type === ControllerType.VIEW)
    .map(controller => controller as ViewController);
