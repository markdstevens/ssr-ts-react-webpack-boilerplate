import { Controller } from 'platform/controllers';

export interface MethodDecorator {
  (target: Controller, propertyKey: string, descriptor: PropertyDescriptor): void;
}
