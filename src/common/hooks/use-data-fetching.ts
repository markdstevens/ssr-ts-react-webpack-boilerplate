import { Dispatch, useEffect, useRef, useState } from 'react';
import { GenericState, State } from 'utils/store';
import { UrlPathParams } from 'utils/fetch-wrapper';
import { ClientFetch } from 'common/controllers';

export interface DataFetchingProps<T> {
  state: T;
  loading: boolean;
  error: string | null;
}

export interface UseDataFetchingResponse<T> {
  error: string | null;
  loading: boolean;
}

export function useDataFetching<T>(
  pathParams: UrlPathParams | undefined = {},
  initialState: State<T>,
  dispatch: Dispatch<GenericState>,
  clientFetch: ClientFetch<GenericState>
): UseDataFetchingResponse<T> {
  const didMount = useRef(false);
  const [state, setState] = useState({
    error: null,
    loading: didMount.current
  });

  useEffect(() => {
    if (didMount.current || !initialState) {
      didMount.current = true;
      setState({ error: null, loading: true });
      clientFetch(pathParams)
        .then(response => {
          setState({ error: null, loading: false });
          dispatch({ data: response?.data });
        })
        .catch(error =>
          setState({
            error: error.toString(),
            loading: false
          })
        );
    } else {
      didMount.current = true;
    }
  }, [pathParams]);

  return state;
}
