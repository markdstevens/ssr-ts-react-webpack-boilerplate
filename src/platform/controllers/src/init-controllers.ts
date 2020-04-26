import { Controller } from './controller';
import { NameController } from 'controllers/name-controller';

export const initControllers = (): Controller[] => [new NameController('NameController')];
