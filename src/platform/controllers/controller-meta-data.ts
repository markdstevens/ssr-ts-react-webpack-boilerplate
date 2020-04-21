import { DataViewHocResponse } from 'common/views/types';
import { BaseViewController } from './base-view-controller';
import { FetchOptions } from './controller';

export interface MatchingControllerMethodMetaData {
  fetchOptions: FetchOptions;
  controllerMethod: string;
  methodPaths: string[];
}

export interface ControllerActionMetaData {
  controller: BaseViewController;
  action: string;
  View: DataViewHocResponse;
}
