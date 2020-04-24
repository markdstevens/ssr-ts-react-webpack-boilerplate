import { Controller } from 'platform/controllers/controller';
import { NameController } from 'controllers/name-controller';

export const initControllers = (): Controller[] => [new NameController('NameController')];
