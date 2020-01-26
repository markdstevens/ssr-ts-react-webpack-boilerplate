const buildPathParamRegex = (path, keys) => {
  path = path.replace(new RegExp('/', 'g'), '\\/');
  keys.forEach(({ name }) => {
    path = path.replace(`:${name}`, `(?<${name}>.*)`);
  });
  return path;
}

const storeTemplate = (
  name,
  pathname,
  path,
  keys
) => `import {Request} from 'express';
import {config} from 'config';
import {initStore, fetchWrapper} from 'stores/base';
import {${name.pascal}State, ${name.pascal}Params} from 'stores/${pathname}';

export const store = initStore<${name.pascal}State>();

export const fetch = async ({ params }: Request): Promise<${name.pascal}State> => {
  let {url} = config.stores.${name.camel};
  const path = params['0'];

  const result = path.match(/${buildPathParamRegex(path, keys)}/);
  const pathParams: ${name.pascal}Params = result?.groups ? {
    ${keys.map(({ name }) => `${name}: result.groups.${name}`)}
  }: {
    ${keys.map(({ name }) => `${name}: ''`)}
  }

  ${keys.map(({ name }) => `url = url.replace(':${name}', pathParams.${name})`)}

  return await fetchWrapper<${name.pascal}State>(url);
};
`;

module.exports = storeTemplate;
