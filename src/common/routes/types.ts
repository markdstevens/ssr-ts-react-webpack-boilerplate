import { RouteComponentProps } from 'react-router-dom';
import { GenericState } from 'stores/base';
import { LoadableComponent } from '@loadable/component';
import { Request } from 'express';

export type StatefulDynamicRoute<T = any> = (
  props: RouteComponentProps<T>
) => JSX.Element;

export type StatefulStaticRoute<T = any> = (props: T) => JSX.Element;

export type StatelessRoute = LoadableComponent<any>;

export type PageComponent =
  | StatefulDynamicRoute
  | StatefulStaticRoute
  | StatelessRoute;

export interface Route {
  name: string;
  path?: string;
  exact?: boolean;
  component: PageComponent;
  serverFetch?: (req: Request) => Promise<GenericState>;
}
