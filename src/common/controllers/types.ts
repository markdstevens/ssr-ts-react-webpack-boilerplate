import { RouteComponentProps } from 'react-router-dom';
import { UrlPathParams } from 'utils/fetch-wrapper';
import { LoadableComponent } from '@loadable/component';
import { Request } from 'express';
import { DataFetchingProps } from 'hooks/use-data-fetching';
import { Store } from 'utils/store';

export type PageProps<T, R = void> = RouteComponentProps<R> & DataFetchingProps<T>;
export type StatefulPage<T, R = void> = LoadableComponent<PageProps<T, R>>;
export type StatelessPage = LoadableComponent<RouteComponentProps>;
export type PageComponent<T> = StatefulPage<T> | StatelessPage;

export type StatefulPageComponent<T> = React.FC<RouteComponentProps<T>>;
export type StatelessPageComponent = React.FC<RouteComponentProps>;

export type ServerFetch<T> = (req: Request) => Promise<T | null>;
export type ClientFetch<T> = (pathParams: UrlPathParams) => Promise<T | null>;

export interface Controller<T = any, R = any> {
  path: string;
  page: StatefulPageComponent<R> | StatelessPageComponent;
  exact: boolean;
  serverFetch?: ServerFetch<T>;
  clientFetch?: ClientFetch<T>;
  store?: Store<T>;
  init: () => Controller<T, R>;
}
