import { Request } from 'express';
import { Stores } from 'stores/types';
import { ControllerType } from './ControllerType';

export interface FetchOptions {
  params: Params;
  pathname: string;
  stores: Stores;
}

interface Params {
  [key: string]: string | number | boolean;
}

export interface RouteProps {
  params: Params;
  pathname: string;
}

export type ClientFetch = (routeProps: RouteProps, stores: Stores) => Promise<void>;

export interface Controller {
  path: string;
  exact: boolean;
  type: ControllerType;
  clientFetch?: ClientFetch;
  serverFetch?: (request: Request, stores: Stores) => Promise<void>;
  fetch?: (pathParams: FetchOptions) => Promise<void>;
}
