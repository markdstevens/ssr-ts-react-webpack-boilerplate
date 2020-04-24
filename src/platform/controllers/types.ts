import { FC } from 'react';
import { Stores } from 'platform/stores/types';
import { Controller } from './controller';
import { LoadableComponent } from '@loadable/component';
import { DataViewHocProps } from 'platform/hocs/DataView';

export interface FetchOptions {
  params: Params;
  stores: Stores;
  actionPaths: string[];
  fullPaths: string[];
  controllerPath: string;
}

interface Params {
  [key: string]: string | number | boolean;
}

export interface RegisteredControllerAction {
  name: string;
  paths: string[];
  fullPaths: string[];
  view: LoadableComponent<{}> | undefined;
  method: ((fetchOptions: FetchOptions) => Promise<void>) | undefined;
}

export interface RegisteredController {
  instance: Controller | undefined;
  name: string;
  basePath: string;
  actions: RegisteredControllerAction[];
}

export interface ReactRouterAction {
  basePath: string;
  path: string;
  View: FC<DataViewHocProps> | undefined;
  fetch: undefined | ((fetchOptions: FetchOptions) => Promise<void>);
}

export interface ControllerRegistry {
  findControllerByControllerName: (controllerName: string) => RegisteredController | undefined;
  findControllerByPath: (fullPath: string) => RegisteredController | undefined;
  findActionByControllerAndActionName: (
    controllerName: string,
    actionName: string
  ) => RegisteredControllerAction | undefined;
  findActionByFullPath: (fullPath: string) => RegisteredControllerAction | undefined;
  findViewByControllerAndActionName: (
    controllerName: string,
    actionName: string
  ) => LoadableComponent<{}> | undefined;
  findControllerForAction: (
    action: RegisteredControllerAction | undefined
  ) => RegisteredController | undefined;

  registerAndGetNewController: (name: string, basePath: string) => RegisteredController;
  registerViewForAction: (
    controllerName: string,
    actionName: string,
    loadableComponent: LoadableComponent<{}>
  ) => void;
  registerAndGetNewActionForController: (
    controllerName: string,
    actionName: string,
    actionPaths: string[]
  ) => RegisteredControllerAction;
  initializeOrGetController: (controllerName: string) => RegisteredController;
  getRegisteredControllers: () => RegisteredController[];
  getActionMetaDataForReactRouter: () => ReactRouterAction[];
}
