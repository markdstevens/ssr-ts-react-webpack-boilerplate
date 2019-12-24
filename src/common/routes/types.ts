import { RouteComponentProps } from 'react-router-dom';
import { GenericState } from 'stores/base';

export interface Route {
  path: string;
  exact: boolean;
  component: (props: RouteComponentProps) => JSX.Element;
  fetchInitialData?: (...args: any) => Promise<GenericState>;
}
