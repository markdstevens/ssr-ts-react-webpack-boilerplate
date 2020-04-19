import { Stores } from 'stores/types';
import { ControllerType } from './ControllerType';
import { ControllerActionMetaData, MatchingControllerMethodMetaData } from './controller-meta-data';

export interface FetchOptions {
  params: Params;
  actionPath: string;
  controllerPath: string;
  fullPath: string;
  stores: Stores;
}

interface Params {
  [key: string]: string | number | boolean;
}

export interface Controller {
  path: string;
  exact: boolean;
  type: ControllerType;
  actionDetails: ControllerActionMetaData[];
  getMatchingControllerMethodMetaData: (
    pathname: string,
    stores: Stores
  ) => MatchingControllerMethodMetaData | undefined;
}

export interface CallableController {
  [key: string]: (fetchOptions: FetchOptions) => Promise<void>;
}
