import { Controller, FetchOptions, MethodDecorator } from 'platform/controllers';
import { controllerRegistry } from 'platform/controllers/controller-registry';

export function route(...pathsForThisRoute: string[]): MethodDecorator {
  return function(target: Controller, methodName: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;
    descriptor.value = async function(fetchOptions: FetchOptions): Promise<void> {
      await originalMethod.apply(this, [fetchOptions]);
    };

    controllerRegistry.registerAndGetNewActionForController(
      target.constructor.name,
      methodName,
      pathsForThisRoute
    );
  };
}
