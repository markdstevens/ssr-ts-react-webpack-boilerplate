import { Controller } from './controller';
import { ControllerType } from './ControllerType';
import { ControllerActionMetaData, MatchingControllerMethodMetaData } from './controller-meta-data';
import { matchPath } from 'react-router-dom';
import { Stores } from 'stores/types';
import autoBind from 'auto-bind';

export abstract class BaseController implements Controller {
  public abstract readonly path: string;
  public abstract readonly exact: boolean;
  public abstract readonly type: ControllerType;
  public abstract get actionDetails(): ControllerActionMetaData[];

  constructor() {
    autoBind(this);
  }

  public getMatchingControllerMethodMetaData(
    fullPathname: string,
    stores: Stores
  ): MatchingControllerMethodMetaData | undefined {
    return Object.keys(this)
      .filter(methodOrProperty =>
        Object.getOwnPropertyDescriptor(this, methodOrProperty)?.value?.name?.includes('__API_METHOD__')
      )
      .map(controllerMethod => {
        const controllerPath = this.path;
        const actionPath = fullPathname.replace(this.path, '');
        const fullPath = `${controllerPath}${actionPath}`;

        const [, , methodPaths] = Object.getOwnPropertyDescriptor(this, controllerMethod)?.value?.name?.split('|');

        const match = (methodPaths.split(',') as string[])
          .map(methodPath =>
            matchPath(actionPath, {
              path: methodPath
            })
          )
          .find(match => match?.isExact);

        const params = match?.params ?? {};

        return {
          fetchOptions: { ...{ actionPath, controllerPath, fullPath, params }, stores },
          controllerMethod,
          methodPaths: methodPaths?.split(','),
          isMatch: match?.isExact ?? false
        };
      })
      .find(matchingControllerMethods => matchingControllerMethods.isMatch);
  }
}
