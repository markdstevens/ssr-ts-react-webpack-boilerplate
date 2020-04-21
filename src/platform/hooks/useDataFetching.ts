import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useContext, useMemo } from 'react';
import { useServerContextStore } from 'platform/stores/server-context-store';
import { FetchOptions } from 'platform/controllers/controller';
import { AllStoreContext } from 'platform/stores/all-store-context';

interface FetchMethod {
  (fetchOptions: FetchOptions): Promise<void>;
}

export function useDataFetching<T>(clientFetch: FetchMethod, controllerPath: string): void {
  const location = useLocation();
  const params = useParams();
  const stores = useContext(AllStoreContext);
  const [serverContextState] = useServerContextStore();

  const actionPath = location.pathname.replace(controllerPath, '');
  const fullPath = `${controllerPath}${actionPath}`;

  const clientFetchParams = useMemo(
    () => ({
      pathname: location.pathname,
      params,
      stores,
      actionPath,
      controllerPath,
      fullPath
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
