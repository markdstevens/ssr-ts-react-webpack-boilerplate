import { LoadableComponent } from '@loadable/component';
import { BaseViewController } from 'platform/controllers/base-view-controller';

interface DataViewHocResponseProps {
  controller: BaseViewController;
}
export type DataViewHocResponse = (props: DataViewHocResponseProps) => JSX.Element;
export type DataViewHoc = (baseViewController: BaseViewController) => DataViewHocResponse;

export type StatelessView = LoadableComponent<{}>;
export type StatefulView = LoadableComponent<{}>;

export type ControllerView = StatelessView | StatefulView;
