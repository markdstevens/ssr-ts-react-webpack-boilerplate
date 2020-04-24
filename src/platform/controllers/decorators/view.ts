import { LoadableComponent } from '@loadable/component';
import { Controller, MethodDecorator, FetchOptions } from 'platform/controllers';
import { controllerRegistry } from 'platform/controllers/controller-registry';

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
