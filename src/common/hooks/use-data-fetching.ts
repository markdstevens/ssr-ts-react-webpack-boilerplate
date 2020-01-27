import { Dispatch, useEffect, useRef, useState } from 'react';
import { GenericState, UrlPathParams, fetchWrapper } from 'stores/base';

export interface UseDataFetchingResponse<T> {
  error: string | null;
  loading: boolean;
}

/**
 * @description useDataFetching
 *   This hook is responsible for retrieving data on the browser in the case
 *   where either no data was retrieved on the server or where we are switching
 *   routes and need to fetch new data. While data is being fetched, this hook
 *   returns { loading: true, error: null } which indicates to the client of
 *   this method that some fallback should be rendered until loading === false.
 *   Once the axios response comes back, the loading state is set to false and
 *   the fetched data is dispatched.
 *
 * @typeparam {T} The type describing the API response
 *
 * @param {string} dataSource The URI that gets passed directly to axios.get
 * @param {UrlPathParams | undefined} pathParams An object map of path params
 * @param {T} initialState The initial data from the server, if there is any
 * @param {Dispatch<GenericState>} dispatch Dipatch function that triggers the
 * reducer to update the route's application state
 * @param {boolean} overrideMemo
 *
 * @return {UseDataFetchingResponse} Response that indicates the state of the
 * axios request: loading or error
 */
export function useDataFetching<T>(
  dataSource: string,
  pathParams: UrlPathParams | undefined = {},
  initialState: T,
  dispatch: Dispatch<GenericState>
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
      fetchWrapper<T>(dataSource, pathParams)
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
  }, [dataSource, pathParams]);

  return state;
}
