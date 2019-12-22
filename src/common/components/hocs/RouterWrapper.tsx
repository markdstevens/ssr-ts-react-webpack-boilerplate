import React from 'react';
import { RouteProps } from 'routes';
import { Store } from 'stores/base';
import { useInitialData } from 'components/App';

export function RouterWrapper<T, R>(WrappedComponent: React.FunctionComponent<RouteProps<T, R>>, { CustomProvider, reducer }: Store<T>): React.FunctionComponent<RouteProps<T, R>> {
  const Wrapper = (props: RouteProps<T, R>): JSX.Element => {
    const data = useInitialData();

    return (
      // @ts-ignore
      <CustomProvider initialState={data} reducer={reducer}>
        <WrappedComponent {...props }/>      
      </CustomProvider>
    );
  };
  Wrapper.displayName = 'RouterWrapper';  
  return Wrapper;
};
