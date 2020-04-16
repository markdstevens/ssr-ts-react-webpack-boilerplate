import { TodoController } from './todo-controller';
import { Controller } from './platform/controller';
import { ViewController } from './platform/view-controller';
import { ControllerType } from './platform/ControllerType';

export const initControllers = (): Controller[] => [new TodoController()];

export const initViewControllers = (): ViewController[] =>
  initControllers()
    .filter(controller => controller.type === ControllerType.VIEW)
    .map(controller => controller as ViewController);
