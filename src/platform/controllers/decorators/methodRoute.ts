import { Controller, FetchOptions } from 'controllers/platform/controller';

interface MethodDecorator {
  (target: Controller, propertyKey: string, descriptor: PropertyDescriptor): void;
}

/**
 * This decorator marks a controller method as a special "action" method. An
 * "action" is a method with one or more routes that can be matched by react-router.
 *
 * Internally, the sole purpose of this decorator is to add a special property to the
 * decorated method's descriptor object that allows this method to be easily discovered
 * when scanning all methods of a controller. The special property includes three important
 * pieces of information encoded into a single pipe-delimeted string:
 *
 *   1. An __API_METHOD__ substring so that the method can be identified as an action
 *   2. A propertyKey substring which equals the name of the actual controller method
 *   3. A comma-delimeted substring containing all routes that map to the controller action
 *
 * Example of string: "__API_METHOD__|findTodos|/findTodos,/findAllTodos"
 */
export function route(...pathsForThisRoute: string[]): MethodDecorator {
  return function(target: Controller, methodName: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;
    descriptor.value = async function(fetchOptions: FetchOptions): Promise<void> {
      await originalMethod.apply(this, [fetchOptions]);
    };

    Object.defineProperty(descriptor.value, 'name', {
      value: `__API_METHOD__|${methodName}|${pathsForThisRoute.join(',')}`,
      writable: false
    });
  };
}
