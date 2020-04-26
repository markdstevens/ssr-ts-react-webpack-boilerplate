import { LoadableComponent } from '@loadable/component';
import { Controller } from '../controller';
import { controllerRegistry } from '../controller-registry';
import { MethodDecorator } from './method-decorator-type';
import { FetchOptions } from '../types';

export function view(loadableComponent: LoadableComponent<{}>): MethodDecorator {
  return function(target: Controller, methodName: string, descriptor: PropertyDescriptor): void {
    controllerRegistry.registerViewForAction(
      target.constructor.name,
      methodName,
      loadableComponent
    );

    const originalMethod = descriptor.value;
    descriptor.value = async function(fetchOptions: FetchOptions): Promise<void> {
      await originalMethod.apply(this, [fetchOptions]);
    };
  };
}
