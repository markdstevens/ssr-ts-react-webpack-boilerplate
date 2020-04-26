import { controllerRegistry } from '../controller-registry';
import { Controller } from '../controller';

export function staticRoute(...pathsForThisRoute: string[]) {
  return function(target: Controller, propertyKey: string): void {
    controllerRegistry.registerAndGetNewActionForController(
      target.constructor.name,
      propertyKey,
      pathsForThisRoute
    );
  };
}
