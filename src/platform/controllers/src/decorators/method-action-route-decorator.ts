import { Controller } from '../controller';
import { controllerRegistry } from '../controller-registry';
import { MethodDecorator } from './method-decorator-type';
import { FetchOptions } from '../types';

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
