import React from 'react';
import { RouteProps } from 'routes';
import { Store } from 'stores/base';
import { useInitialData } from 'components/App';
import { LoadableComponent } from '@loadable/component'

export function RouterWrapper<T, R>(WrappedComponent: LoadableComponent<RouteProps<T, R>>, { CustomProvider, reducer }: Store<T>): React.FunctionComponent<RouteProps<T, R>> {
  const Wrapper = (props: RouteProps<T, R>): JSX.Element => (
    // @ts-ignore
    <CustomProvider initialState={useInitialData()} reducer={reducer}>
      <WrappedComponent {...props }/>      
    </CustomProvider>
  );
  Wrapper.displayName = 'RouterWrapper';  
  return Wrapper;
};
