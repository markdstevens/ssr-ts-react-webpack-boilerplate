const storeTemplate = (name, pathname, apiURLWithPathParams) => `import {Request} from 'express';
import {config} from 'config';
import {initStore, fetchWrapper, GenericState} from 'stores/base';
import {${name.pascal}State} from 'stores/${pathname}';

export const store = initStore<${name.pascal}State>();

export const fetch = async (): Promise<${name.pascal}State> => {
  let {url} = config.stores.${name.camel};

  /**
   * Augment 'url' with the values passed in the parameters
   *
   * 'url' is ${apiURLWithPathParams}
   */

  return await fetchWrapper<${name.pascal}State>(url);
};

export const fetchDelegate = (req: Request): Promise<GenericState> => {
  /**
   * use req object to retrieve URL params and path params. Update the fetch
   * call with the needed values.
   */

  return fetch();
};
`;

module.exports = storeTemplate;
