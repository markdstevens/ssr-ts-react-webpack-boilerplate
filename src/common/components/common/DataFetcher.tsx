import React from 'react';
import { useDataFetching, DataFetchingProps } from 'hooks/use-data-fetching';
import { RouteComponentProps } from 'react-router-dom';
import { LoadableComponent } from '@loadable/component';
import { Store, GenericState } from 'utils/store';
import { ClientFetch } from 'controllers';

interface DataFetcherProps<T, R = void> {
  WrappedComponent:
    | LoadableComponent<DataFetchingProps<T>>
    | LoadableComponent<RouteComponentProps<R> & DataFetchingProps<T>>;
  routeStore: Store<T>;
  props: RouteComponentProps<R>;
  clientFetch: ClientFetch<T>;
}

export function DataFetcher<T, R>({
  WrappedComponent,
  routeStore,
  props,
  clientFetch
}: DataFetcherProps<T, R>): JSX.Element {
  const [state, dispatch] = routeStore.useCustomState();
  const { loading, error } = useDataFetching<T>(
    props?.match?.params ?? {},
    state,
    dispatch as React.Dispatch<GenericState>,
    clientFetch
  );

  return <WrappedComponent {...{ state, loading, error }} {...props} />;
}
DataFetcher.displayName = 'DataFetcher';
