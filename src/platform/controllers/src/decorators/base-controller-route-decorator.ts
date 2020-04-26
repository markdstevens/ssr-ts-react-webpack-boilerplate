import { controllerRegistry } from '../controller-registry';

/**
 * This decorator is meant to be placed above a controller class declaration.
 * It adds a single "path" property to the controller which is the base path
 * for the controller's action methods.
 */
export function baseRoute(routeName: string) {
  return function<T extends { new (...args: any[]): { path: string } }>(constructor: T): T {
    controllerRegistry.registerAndGetNewController(constructor.name, routeName);

    return class extends constructor {
      path = routeName;
    };
  };
}
