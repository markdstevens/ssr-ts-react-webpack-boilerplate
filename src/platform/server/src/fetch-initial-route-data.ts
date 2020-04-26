import { RegisteredControllerAction } from 'platform/controllers';
import { logger, Event, getMatchFromAction } from 'platform/utils';
import { Stores } from 'platform/stores';

export async function fetchInitialRouteData(
  controllerAction: RegisteredControllerAction | undefined,
  stores: Stores,
  pathname: string
): Promise<void> {
  if (controllerAction) {
    await controllerAction.method?.({
      params: getMatchFromAction(controllerAction, pathname)?.params ?? {},
      stores,
      controllerPath: controllerAction.controller.basePath,
      actionPaths: controllerAction.paths,
      fullPaths: controllerAction.fullPaths,
      isServer: true
    });
  } else {
    logger.event(
      Event.NO_CONTROLLER_ACTION_FOUND,
      `no controller mapping exists found for ${pathname}`,
      {
        path: pathname
      }
    );
  }
}
