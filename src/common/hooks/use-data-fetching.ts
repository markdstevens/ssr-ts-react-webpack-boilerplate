import { useState, useEffect, useRef, Dispatch } from 'react';
import axios from 'axios';
import { GenericState } from 'stores/base';

export interface UseDataFetchingResponse<T>{
  error: string;
  loading: boolean;
}

/*
 * On the initial render, we always return { error: null, loading: false }. If there is server-rendered data,
 * it will display. Otherwise, I assume that no data is desired since it should have been retrieved on the 
 * server for the initial load.
 * 
 * On subsequent renders, the following sequence occurs:
 *   1. setState({ error: null, loading: true })
 *   2. setState({ error: null, loading: false })
 *   3. dispatch({ data: value.data })
 * 
 * The first setState is what triggers any interstitial behavior. The second setState undoes that. The 
 * dispatch method updates the application state with the response from axios.
*/
export function useDataFetching<T>(dataSource: string, initialState: T, dispatch: Dispatch<GenericState>): UseDataFetchingResponse<T> {
  const didMount = useRef(false);
  const [state, setState] = useState({
    error: null,
    loading: didMount.current
  });

  useEffect(() => {
    if (didMount.current || !initialState) {
      didMount.current = true;
      setState({ error: null, loading: true });
      axios.get<T>(dataSource)
        .then(value => {
          setState({ error: null, loading: false });
          dispatch({ data: value.data });
        })
        .catch(error => setState({ error: error.toString(), loading: false }));
    } else {
      didMount.current = true;
    }
  }, [dataSource]);

  return state;
};
