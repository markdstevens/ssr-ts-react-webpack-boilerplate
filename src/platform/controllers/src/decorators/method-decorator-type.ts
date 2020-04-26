import { Controller } from '../controller';

export interface MethodDecorator {
  (target: Controller, propertyKey: string, descriptor: PropertyDescriptor): void;
}
