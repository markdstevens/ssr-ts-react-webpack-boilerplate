import { Controller, FetchOptions, RouteProps } from './controller';
import { pathToRegexp, Key } from 'path-to-regexp';
import { Request } from 'express';
import { UrlPathParams } from 'utils/fetch-wrapper';
import { Stores } from 'stores/types';
import { ControllerType } from './ControllerType';

export abstract class BaseController implements Controller {
  public abstract readonly path: string;
  public abstract readonly exact: boolean;
  public abstract readonly type: ControllerType;

  constructor() {
    this.clientFetch = this.clientFetch.bind(this);
    this.serverFetch = this.serverFetch.bind(this);
  }

  /**
   * This is a dummy method. Subclasses that wish to have fetch functionality
   * can override this method
   */
  public async fetch(fetchOptions: FetchOptions): Promise<void> {
    return Promise.resolve();
  }

  public async clientFetch(routeProps: RouteProps, stores: Stores): Promise<void> {
    await this.fetch({ ...routeProps, stores });
  }

  public async serverFetch(req: Request, stores: Stores): Promise<void> {
    const result = req.params['0'].match(this.pathRegex);
    const params: UrlPathParams = {};

    if (result?.groups) {
      Object.keys(result?.groups).forEach(group => {
        params[group] = (result.groups && result.groups[group]) ?? '';
      });
    }

    await this.fetch({ ...{ pathname: req.url, params }, stores });
  }

  protected get isStateful(): boolean {
    return Object.getPrototypeOf(this).hasOwnProperty('fetch');
  }

  private get pathRegex(): RegExp {
    const keys: Key[] = [];
    pathToRegexp(this.path, keys);

    let finalPath = this.path.replace(new RegExp('/', 'g'), '\\/');
    keys.forEach(({ name }) => {
      finalPath = finalPath.replace(`:${name}`, `(?<${name}>.*)`);
    });

    return new RegExp(finalPath);
  }
}
