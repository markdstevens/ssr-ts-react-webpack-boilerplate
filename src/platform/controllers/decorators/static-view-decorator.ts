import { controllerRegistry } from 'platform/controllers/controller-registry';
import { Controller } from 'platform/controllers/controller';
import { LoadableComponent } from '@loadable/component';

export function staticView(loadableComponent: LoadableComponent<{}>) {
  return function(target: Controller, propertyKey: string): void {
    controllerRegistry.registerViewForAction(
      target.constructor.name,
      propertyKey,
      loadableComponent
    );
  };
}
