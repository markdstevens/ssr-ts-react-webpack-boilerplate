import { controllerRegistry } from 'platform/controllers/controller-registry';
import { Controller } from 'platform/controllers/controller';

export function staticRoute(...pathsForThisRoute: string[]) {
  return function(target: Controller, propertyKey: string): void {
    controllerRegistry.registerAndGetNewActionForController(
      target.constructor.name,
      propertyKey,
      pathsForThisRoute
    );
  };
}
