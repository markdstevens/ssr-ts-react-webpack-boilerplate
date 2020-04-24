import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useContext, useMemo } from 'react';
import { useServerContextStore } from 'platform/stores/server-context-store';
import { FetchOptions, controllerRegistry } from 'platform/controllers';
import { AllStoreContext } from 'platform/stores/all-store-context';

interface FetchMethod {
  (fetchOptions: FetchOptions): Promise<void>;
}

export function useDataFetching(clientFetch: FetchMethod | undefined): void {
  const location = useLocation();
  const params = useParams();
  const stores = useContext(AllStoreContext);
  const [serverContextState] = useServerContextStore();

  const action = controllerRegistry.findActionByFullPath(location.pathname);

  const clientFetchParams = useMemo(
    () => ({
      params,
      stores,
      fullPaths: action?.fullPaths ?? [],
      actionPaths: action?.paths ?? [],
      controllerPath: controllerRegistry.findControllerForAction(action)?.basePath ?? '/'
    }),
    [location]
  );

  useEffect(() => {
    (async function fetch(): Promise<void> {
      if (clientFetch && !serverContextState.isServerLoad) {
        await clientFetch(clientFetchParams);
      }
    })();
  }, [clientFetchParams]);
}
