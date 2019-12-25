import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Store} from 'stores/base';
import {useInitialData} from 'components/App';
import {LoadableComponent} from '@loadable/component';
import {StatefulRoute} from 'routes';

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
 *
 * @return {StatefulRoute} A HOC component providing initial state data to the
 * wrapped component and its decendents.
 */
export function withStatefulRoute<T, R>(
    WrappedComponent: LoadableComponent<RouteComponentProps<R>>,
    routeStore: Store<T>,
): StatefulRoute<R> {
  const Wrapper = (props: RouteComponentProps<R>): JSX.Element => (
    <routeStore.CustomProvider
      initialState={useInitialData() as T}
      reducer={routeStore.reducer}
    >
      <WrappedComponent {...props }/>
    </routeStore.CustomProvider>
  );
  Wrapper.displayName = 'StatefulRoute';
  return Wrapper;
};
