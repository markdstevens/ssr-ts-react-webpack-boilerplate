import { Controller, controllerRegistry } from 'platform/controllers';
import { logger } from 'platform/utils/logger';
import { Event } from 'platform/utils/event';
import { Stores } from 'platform/stores/types';
import { matchPath } from 'react-router-dom';

export async function fetchInitialRouteData(
  controller: Controller | null | undefined,
  stores: Stores,
  pathname: string
): Promise<void> {
  if (!controller) {
    logger.event(Event.NO_ROUTE_FOUND, `no controller found for ${pathname}`);
  } else {
    const action = controllerRegistry.findActionByFullPath(pathname);

    if (action) {
      const match = action.fullPaths
        .map(path =>
          matchPath(pathname, {
            path,
            exact: true
          })
        )
        .find(match => match?.isExact);

      await action.method?.({
        params: match?.params ?? {},
        stores,
        controllerPath: controller.path,
        actionPaths: action.paths,
        fullPaths: action.fullPaths
      });
    } else {
      logger.event(Event.NO_ROUTE_FOUND, `no controller action found for ${pathname}`);
    }
  }
}
