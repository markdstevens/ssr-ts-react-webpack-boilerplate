import {RouteComponentProps} from 'react-router-dom';
import {GenericState} from 'stores/base';
import {LoadableComponent} from '@loadable/component';

export type StatefulRoute<T = any> =
  (props: RouteComponentProps<T>) => JSX.Element;
export type StatelessRoute = LoadableComponent<any>;

export interface Route {
  name: string;
  path: string;
  exact: boolean;
  component: StatefulRoute | StatelessRoute;
  fetchInitialData?: (...args: any) => Promise<GenericState>;
}
