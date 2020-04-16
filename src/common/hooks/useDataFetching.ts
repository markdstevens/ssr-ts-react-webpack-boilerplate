import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { useServerContextStore } from 'stores/platform/server-context-store';
import { ClientFetch, RouteProps } from 'controllers/platform/controller';
import { AllStoreContext } from 'stores/all-store-context';

interface UseDataResponse {
  error: string;
  loading: boolean;
}

export function useDataFetching<T>(clientFetch: ClientFetch): UseDataResponse {
  const location = useLocation();
  const params = useParams();
  const stores = useContext(AllStoreContext);
  const [serverLocation] = useServerContextStore();

  const isSamePathAsInitialPageLoad = serverLocation.location === location.pathname;
  const [dataResponseState, setDataResponseState] = useState<UseDataResponse>({
    error: '',
    loading: !isSamePathAsInitialPageLoad
  });

  useEffect(() => {
    async function fetch(routeProps: RouteProps): Promise<void> {
      setDataResponseState({ error: '', loading: true });
      await clientFetch(routeProps, stores);
      setDataResponseState({ error: '', loading: false });
    }

    fetch({ pathname: location.pathname, params });
  }, [location, params, clientFetch]);

  return dataResponseState;
}
