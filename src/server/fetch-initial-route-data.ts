import { CallableController, ViewController } from 'controllers/platform';
import { logger } from 'utils/logger';
import { Event } from 'utils/event';
import { Stores } from 'stores/types';

export async function fetchInitialRouteData(
  controller: ViewController | undefined,
  stores: Stores,
  pathname: string
): Promise<void> {
  if (!controller) {
    logger.event(Event.NO_ROUTE_FOUND, `no controller found for ${pathname}`);
  } else {
    const matchingControllerMethodMetaData = controller.getMatchingControllerMethodMetaData(pathname, stores);

    if (matchingControllerMethodMetaData) {
      await ((controller as unknown) as CallableController)[matchingControllerMethodMetaData?.controllerMethod](
        matchingControllerMethodMetaData?.fetchOptions
      );
    } else {
      logger.event(Event.NO_ROUTE_FOUND, `no controller action found for ${pathname}`);
    }
  }
}
