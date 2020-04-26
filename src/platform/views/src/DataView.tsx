import React, { FC, useContext, useMemo, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { LoadableComponent } from '@loadable/component';
import { logger, Event } from 'platform/utils';
import { controllerRegistry } from 'platform/controllers';
import { useServerContextStore, AllStoreContext } from 'platform/stores';

export const dataView = (View: LoadableComponent<{}>): FC => {
  const DataView = (): JSX.Element => {
    const location = useLocation();
    const params = useParams();
    const stores = useContext(AllStoreContext);
    const [serverContextState] = useServerContextStore();

    const action = controllerRegistry.findActionByFullPath(location.pathname);

    if (!action?.method) {
      logger.event(
        Event.NO_CONTROLLER_ACTION_FOUND,
        `no controller action found for ${location.pathname}`
      );
    }

    const clientFetchParams = useMemo(
      () => ({
        params,
        stores,
        fullPaths: action?.fullPaths ?? [],
        actionPaths: action?.paths ?? [],
        controllerPath: action?.controller.basePath ?? '/',
        isServer: typeof window === 'undefined'
      }),
      [location]
    );

    useEffect(() => {
      (async function(): Promise<void> {
        if (action?.method && !serverContextState.isServerLoad) {
          await action?.method(clientFetchParams);
        }
      })();
    }, [clientFetchParams]);

    return <View />;
  };
  DataView.displayName = 'DataView';
  return DataView;
};
