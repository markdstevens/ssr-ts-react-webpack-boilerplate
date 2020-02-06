import React from 'react';
import { StatelessPageComponent, StatelessPage } from 'controllers';
import { RouteComponentProps } from 'react-router-dom';

export function withStatelessRoute(WrappedComponent: StatelessPage): StatelessPageComponent {
  const Wrapper = (props: RouteComponentProps): JSX.Element => <WrappedComponent {...props} />;
  Wrapper.displayName = 'StatelessRoute';
  return Wrapper;
}
