const buildPathParamRegex = (path, keys) => {
  path = path.replace(new RegExp('/', 'g'), '\\/');
  keys.forEach(({ name }) => {
    path = path.replace(`:${name}`, `(?<${name}>.*)`);
  });
  return path;
};

const pathParamsStoreTemplate = (
  name,
  path,
  keys
) => `import { Request } from 'express';
import { config } from 'config';
import { initStore, fetchWrapper } from 'stores/base';
import { ${name.pascal}State, ${name.pascal}Params } from 'stores/${name.lower}';

export const store = initStore<${name.pascal}State>();

export const serverFetch = async ({
  params
}: Request): Promise<${name.pascal}State> => {
  const result = params['0'].match(/${buildPathParamRegex(path, keys)}/);
  const pathParams: ${name.pascal}Params | undefined = result?.groups && {
    ${keys.map(({ name }) => `${name}: result.groups.${name}`)}
  };

  return await fetchWrapper<${name.pascal}State>(
    config.stores.${name.camel}.url,
    pathParams
  );
};
`;

module.exports = pathParamsStoreTemplate;
