import { LoadableComponent } from '@loadable/component';
import { BaseViewController } from 'controllers/platform/base-view-controller';

export interface StatefulProps {
  error: string;
  loading: boolean;
}

export type DataViewHocResponse = () => JSX.Element;
export type DataViewHoc = (baseViewController: BaseViewController) => DataViewHocResponse;

export type StatelessView = LoadableComponent<{}>;
export type StatefulView = LoadableComponent<StatefulProps>;

export type ControllerView = StatelessView | StatefulView;
