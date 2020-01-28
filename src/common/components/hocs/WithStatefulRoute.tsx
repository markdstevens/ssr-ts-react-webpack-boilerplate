import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Store } from 'stores/base';
import { LoadableComponent } from '@loadable/component';
import { StatefulDynamicRoute, StatefulStaticRoute } from 'routes';
import { InitialContext } from 'utils/server-data-context';

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
 * @param {string} profilerId A unique ID to be identify the wrapped component
 *
 * @return {StatefulDynamicRoute} A HOC component providing initial state data
 * to the wrapped component and its decendents.
 */
export function withStatefulDynamicRoute<T, R = any>(
  WrappedComponent: LoadableComponent<RouteComponentProps<R>>,
  routeStore: Store<T>
): StatefulDynamicRoute<R> {
  const Wrapper = (props: RouteComponentProps<R>): JSX.Element => (
    <InitialContext.Consumer>
      {(serverData): JSX.Element => (
        <routeStore.CustomProvider
          initialState={serverData as T}
          reducer={routeStore.reducer}
        >
          <WrappedComponent {...props} />
        </routeStore.CustomProvider>
      )}
    </InitialContext.Consumer>
  );
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
 * @param {string} profilerId A unique ID to be identify the wrapped component
 *
 * @return {StatefulStaticRoute} A HOC component providing initial state data
 * to the wrapped component and its decendents.
 */
export function withStatefulStaticRoute<T>(
  WrappedComponent: LoadableComponent<void>,
  routeStore: Store<T>
): StatefulStaticRoute<T> {
  const Wrapper = (props: any): JSX.Element => (
    <InitialContext.Consumer>
      {serverData => (
        <routeStore.CustomProvider
          initialState={serverData as T}
          reducer={routeStore.reducer}
        >
          <WrappedComponent {...props} />
        </routeStore.CustomProvider>
      )}
    </InitialContext.Consumer>
  );
  Wrapper.displayName = 'StatefulRoute';
  return Wrapper;
}
