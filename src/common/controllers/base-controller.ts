import { Controller, StatefulPage, StatelessPage } from 'common/controllers';
import { Store, initStore } from 'utils/store';
import { UrlPathParams } from 'utils/fetch-wrapper';
import { Request } from 'express';
import { pathToRegexp, Key } from 'path-to-regexp';
import { withStatefulRoute } from 'hocs/withStatefulRoute';
import { withStatelessRoute } from 'hocs/withStatelessRoute';
import { StatelessPageComponent, StatefulPageComponent } from './types';

export interface GenericPathParams {
  [key: string]: string;
}

export abstract class BaseController<T = any, R = any> implements Controller<T, R> {
  public abstract path: string;
  public abstract component: StatefulPage<T, R> | StatelessPage;
  public exact = true;
  public store: Store<T> = initStore();
  private serverPathRegex = new RegExp('');

  constructor() {
    this.clientFetch = this.clientFetch.bind(this);
  }

  public init(): Controller<T, R> {
    this.serverPathRegex = new RegExp(this.path);
    if (this.path) {
      const keys: Key[] = [];
      pathToRegexp(this.path, keys);

      let finalPath = this.path.replace(new RegExp('/', 'g'), '\\/');
      keys.forEach(({ name }) => {
        finalPath = finalPath.replace(`:${name}`, `(?<${name}>.*)`);
      });
      this.serverPathRegex = new RegExp(finalPath);
    }
    return this;
  }

  public async serverFetch({ params }: Request): Promise<T | null> {
    if (this.isStatefulRoute()) {
      const result = params['0'].match(this.serverPathRegex);
      const pathParams: UrlPathParams = {};

      if (result?.groups) {
        Object.keys(result?.groups).forEach(group => {
          pathParams[group] = (result.groups && result.groups[group]) ?? '';
        });
      }

      return await this.fetch(pathParams);
    }

    return Promise.resolve(null);
  }

  public async clientFetch(pathParams: UrlPathParams): Promise<T | null> {
    return await this.fetch(pathParams);
  }

  public get page(): StatefulPageComponent<R> | StatelessPageComponent {
    return this.isStatefulRoute()
      ? withStatefulRoute<T, R>(this.component as StatefulPage<T, R>, this.store, this.clientFetch)
      : withStatelessRoute(this.component as StatelessPage);
  }

  public async fetch(pathParams: UrlPathParams): Promise<T | null> {
    return Promise.resolve(null);
  }

  private isStatefulRoute(): boolean {
    return Object.getPrototypeOf(this).hasOwnProperty('fetch');
  }
}
