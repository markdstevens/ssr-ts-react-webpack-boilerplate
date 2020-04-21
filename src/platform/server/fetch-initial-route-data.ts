import { CallableController, ViewController } from 'platform/controllers';
import { logger } from 'platform/utils/logger';
import { Event } from 'platform/utils/event';
import { Stores } from 'platform/stores/types';

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
