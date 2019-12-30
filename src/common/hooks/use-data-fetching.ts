import {useState, useEffect, useRef, Dispatch} from 'react';
import {GenericState} from 'stores/base';
import {axiosWrapper} from 'utils/axiosWrapper';

export interface UseDataFetchingResponse<T>{
  error: string;
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
 * @param {T} initialState The initial data from the server, if there is any
 * @param {Dispatch<GenericState>} dispatch Dipatch function that triggers the
 * reducer to update the route's application state
 *
 * @return {UseDataFetchingResponse} Response that indicates the state of the
 * axios request: loading or error
*/
export function useDataFetching<T>(
    dataSource: string,
    initialState: T,
    dispatch: Dispatch<GenericState>,
): UseDataFetchingResponse<T> {
  const didMount = useRef(false);
  const [state, setState] = useState({
    error: null,
    loading: didMount.current,
  });

  useEffect(() => {
    if (didMount.current || !initialState) {
      didMount.current = true;
      setState({error: null, loading: true});
      axiosWrapper<T>(dataSource)
          .then((data) => {
            setState({error: null, loading: false});
            dispatch({data});
          })
          .catch((error) => setState({
            error: error.toString(),
            loading: false,
          }));
    } else {
      didMount.current = true;
    }
  }, [dataSource]);

  return state;
};
