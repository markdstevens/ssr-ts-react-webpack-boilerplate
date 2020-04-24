import { LoadableComponent } from '@loadable/component';
import { matchPath } from 'react-router-dom';
import {
  ControllerRegistry,
  RegisteredController,
  RegisteredControllerAction,
  ReactRouterAction
} from 'platform/controllers/types';
import { dataView } from 'platform/hocs/DataView';

const registeredControllers: RegisteredController[] = [];

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

    controller.basePath = basePath;
    controller.actions?.forEach(action => {
      action.fullPaths = action.paths.map(actionPath => basePath + actionPath);
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
        action.fullPaths.find(path =>
          matchPath(fullPath, {
            path,
            exact: true
          })
        )
      );

      if (matchingAction) {
        return matchingAction;
      }
    }
    return undefined;
  },

  findControllerForAction: (
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
            path: registeredController.basePath + actionPath,
            View: action.view ? dataView(action.view) : undefined,
            fetch: action.method
          })
        )
      )
    );

    return actions;
  },

  findControllerByPath(fullPath: string): RegisteredController | undefined {
    return registeredControllers.find(registeredController =>
      fullPath.startsWith(registeredController.basePath)
    );
  }
};
