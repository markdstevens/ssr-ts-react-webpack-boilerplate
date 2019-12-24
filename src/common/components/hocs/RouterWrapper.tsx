import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Store } from 'stores/base';
import { useInitialData } from 'components/App';
import { LoadableComponent } from '@loadable/component'

export function RouterWrapper<T, R>(WrappedComponent: LoadableComponent<RouteComponentProps<R>>, { CustomProvider, reducer }: Store<T>): React.FunctionComponent<RouteComponentProps<R>> {
  const Wrapper = (props: RouteComponentProps<R>): JSX.Element => (
    <CustomProvider initialState={useInitialData() as T} reducer={reducer}>
      <WrappedComponent {...props }/>      
    </CustomProvider>
  );
  Wrapper.displayName = 'RouterWrapper';  
  return Wrapper;
};
