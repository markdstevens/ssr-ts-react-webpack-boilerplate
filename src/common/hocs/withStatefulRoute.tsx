import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Store } from 'utils/store';
import { StatefulPage, ClientFetch, StatefulPageComponent } from 'controllers';
import { ServerDataContext } from 'utils/server-data-context';
import { DataFetcher } from 'components/common/DataFetcher';

export function withStatefulRoute<T, R = any>(
  WrappedComponent: StatefulPage<T, R>,
  routeStore: Store<T>,
  clientFetch: ClientFetch<T>
): StatefulPageComponent<R> {
  const Wrapper = (props: RouteComponentProps<R>): JSX.Element => (
    <ServerDataContext.Consumer>
      {(serverData): JSX.Element => (
        <routeStore.PageStoreContextProvider
          initialState={serverData as T}
          reducer={routeStore.reducer}
        >
          <DataFetcher
            WrappedComponent={WrappedComponent}
            routeStore={routeStore}
            props={props}
            clientFetch={clientFetch}
          />
        </routeStore.PageStoreContextProvider>
      )}
    </ServerDataContext.Consumer>
  );
  Wrapper.displayName = 'StatefulRoute';
  return Wrapper;
}
