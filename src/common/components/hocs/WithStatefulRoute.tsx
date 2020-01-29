import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Store, GenericState } from 'stores/base';
import { LoadableComponent } from '@loadable/component';
import { StatefulDynamicRoute, StatefulStaticRoute } from 'routes';
import { InitialContext } from 'utils/server-data-context';
import { useDataFetching, DataFetchingProps } from 'hooks/use-data-fetching';

interface DataFetcherProps<T, R = void> {
  WrappedComponent:
    | LoadableComponent<DataFetchingProps<T>>
    | LoadableComponent<RouteComponentProps<R> & DataFetchingProps<T>>;
  routeStore: Store<T>;
  url: string;
  pathParams?: any;
  props: RouteComponentProps<R>;
}

function DataFetcher<T, R>({
  WrappedComponent,
  routeStore,
  url,
  pathParams,
  props
}: DataFetcherProps<T, R>): JSX.Element {
  const [state, dispatch] = routeStore.useCustomState();
  const { loading, error } = useDataFetching<T>(
    url,
    pathParams ?? {},
    state,
    dispatch as React.Dispatch<GenericState>
  );

  return <WrappedComponent {...{ state, loading, error }} {...props} />;
}
DataFetcher.displayName = 'DataFetcher';

/**
 * @description StatefulRoute
 *   Higher order component that wraps a route with a provider which provides
 *   the application state for that route during the initial render of the
 *   component. As a result, this HOC is only useful during the initial render
 *   for the wrapped component.
 *
 * @typeparam {T} The type of the data being set in the provider - usually the
 * top level API type
 * @typeparam {R} The type of the data that react-router will inject into
 * props.match.params
 *
 * @param {LoadableComponent} WrappedComponent The top level route component
 * that is being wrapped
 * @param {Store} routeStore The data store associated with the wrapped
 * component
 * @param {string} url The config object for the wrapped route
 *
 * @return {StatefulDynamicRoute} A HOC component providing initial state data
 * to the wrapped component and its decendents.
 */
export function withStatefulDynamicRoute<T, R = any>(
  WrappedComponent: LoadableComponent<
    RouteComponentProps<R> & DataFetchingProps<T>
  >,
  routeStore: Store<T>,
  url: string
): StatefulDynamicRoute<R> {
  const Wrapper = (props: RouteComponentProps<R>): JSX.Element => {
    return (
      <InitialContext.Consumer>
        {(serverData): JSX.Element => {
          return (
            <routeStore.CustomProvider
              initialState={serverData as T}
              reducer={routeStore.reducer}
            >
              <DataFetcher
                WrappedComponent={WrappedComponent}
                routeStore={routeStore}
                url={url}
                pathParams={props?.match?.params}
                props={props}
              />
            </routeStore.CustomProvider>
          );
        }}
      </InitialContext.Consumer>
    );
  };
  Wrapper.displayName = 'StatefulRoute';
  return Wrapper;
}

/**
 * @description StatefulRoute
 *   Higher order component that wraps a route with a provider which provides
 *   the application state for that route during the initial render of the
 *   component. As a result, this HOC is only useful during the initial render
 *   for the wrapped component.
 *
 * @typeparam {T} The type of the data being set in the provider - usually the
 * top level API type
 *
 * @param {LoadableComponent} WrappedComponent The top level route component
 * that is being wrapped
 * @param {Store} routeStore The data store associated with the wrapped
 * component
 * @param {string} url The config object for the wrapped route
 *
 * @return {StatefulStaticRoute} A HOC component providing initial state data
 * to the wrapped component and its decendents.
 */
export function withStatefulStaticRoute<T>(
  WrappedComponent: LoadableComponent<DataFetchingProps<T>>,
  routeStore: Store<T>,
  url: string
): StatefulStaticRoute {
  const Wrapper = (props: RouteComponentProps): JSX.Element => (
    <InitialContext.Consumer>
      {(serverData): JSX.Element => (
        <routeStore.CustomProvider
          initialState={serverData as T}
          reducer={routeStore.reducer}
        >
          <DataFetcher
            WrappedComponent={WrappedComponent}
            routeStore={routeStore}
            url={url}
            props={props}
          />
        </routeStore.CustomProvider>
      )}
    </InitialContext.Consumer>
  );
  Wrapper.displayName = 'StatefulRoute';
  return Wrapper;
}
