import { LoadableComponent } from '@loadable/component';
import {
  ControllerRegistry,
  RegisteredController,
  RegisteredControllerAction,
  ReactRouterAction
} from './types';
import { getMatchFromAction } from 'platform/utils';
import { dataView } from 'platform/views';

const registeredControllers: RegisteredController[] = [];

const escapeMultipleSlashesInPath = (path: string): string => path.replace(/\/\//g, '/');

export const controllerRegistry: ControllerRegistry = {
  initializeOrGetController: (controllerName: string): RegisteredController =>
    controllerRegistry.findControllerByControllerName(controllerName) ||
    controllerRegistry.registerAndGetNewController(controllerName, ''),

  registerAndGetNewController: (controllerName: string, basePath: string): RegisteredController => {
    let controller = controllerRegistry.findControllerByControllerName(controllerName);

    if (!controller) {
      controller = {
        name: controllerName,
        basePath,
        instance: undefined,
        actions: []
      };
      registeredControllers.push(controller);
    }

    let normalizedBasePath = basePath;
    if (!normalizedBasePath.startsWith('/')) {
      normalizedBasePath = '/' + normalizedBasePath;
    }
    if (!normalizedBasePath.endsWith('/')) {
      normalizedBasePath = normalizedBasePath + '/';
    }

    controller.basePath = normalizedBasePath;
    controller.actions?.forEach(action => {
      action.fullPaths = action.paths.map(actionPath =>
        escapeMultipleSlashesInPath(basePath + actionPath)
      );
    });

    return controller;
  },

  registerAndGetNewActionForController: (
    controllerName: string,
    actionName: string,
    actionPaths: string[]
  ): RegisteredControllerAction => {
    const controller = controllerRegistry.initializeOrGetController(controllerName);
    let action = controllerRegistry.findActionByControllerAndActionName(controllerName, actionName);

    if (!action) {
      action = {
        name: actionName,
        paths: actionPaths,
        fullPaths: [],
        controller,
        view: undefined,
        method: undefined
      };
      controller.actions.push(action);
    }

    action.paths = actionPaths;
    return action;
  },

  registerViewForAction: (
    controllerName: string,
    actionName: string,
    loadableComponent: LoadableComponent<{}>
  ): void => {
    controllerRegistry.initializeOrGetController(controllerName);

    const action =
      controllerRegistry.findActionByControllerAndActionName(controllerName, actionName) ||
      controllerRegistry.registerAndGetNewActionForController(controllerName, actionName, []);

    action.view = loadableComponent;
  },

  findControllerByControllerName: (controllerName: string): RegisteredController | undefined => {
    return registeredControllers.find(({ name }) => name === controllerName);
  },

  findActionByControllerAndActionName: (
    controllerName: string,
    actionName: string
  ): RegisteredControllerAction | undefined => {
    const controller = controllerRegistry.findControllerByControllerName(controllerName);

    return controller?.actions.find(({ name }) => name === actionName);
  },

  findActionByFullPath: (fullPath: string): RegisteredControllerAction | undefined => {
    for (const registeredController of registeredControllers) {
      const matchingAction = registeredController.actions.find(action =>
        getMatchFromAction(action, fullPath)
      );

      if (matchingAction) {
        return matchingAction;
      }
    }
    return undefined;
  },

  findControllerByAction: (
    actionToFind: RegisteredControllerAction | null | undefined
  ): RegisteredController | undefined =>
    actionToFind
      ? registeredControllers.find(controller =>
          controller.actions.find(action => action.name === actionToFind.name)
        )
      : undefined,

  findViewByControllerAndActionName: (
    controllerName: string,
    actionName: string
  ): LoadableComponent<{}> | undefined => {
    const action = controllerRegistry.findActionByControllerAndActionName(
      controllerName,
      actionName
    );

    return (action && action.view) ?? undefined;
  },

  getRegisteredControllers(): RegisteredController[] {
    return registeredControllers;
  },

  getActionMetaDataForReactRouter(): ReactRouterAction[] {
    const actions: ReactRouterAction[] = [];
    registeredControllers.forEach(registeredController =>
      registeredController.actions.forEach(action =>
        action.paths.forEach(actionPath =>
          actions.push({
            basePath: registeredController.basePath,
            path: escapeMultipleSlashesInPath(registeredController.basePath + actionPath),
            View: action.view ? (action.method ? dataView(action.view) : action.view) : undefined
          })
        )
      )
    );

    return actions;
  }
};
