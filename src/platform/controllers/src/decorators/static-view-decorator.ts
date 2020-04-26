import { LoadableComponent } from '@loadable/component';
import { controllerRegistry } from '../controller-registry';
import { Controller } from '../controller';

export function staticView(loadableComponent: LoadableComponent<{}>) {
  return function(target: Controller, propertyKey: string): void {
    controllerRegistry.registerViewForAction(
      target.constructor.name,
      propertyKey,
      loadableComponent
    );
  };
}
