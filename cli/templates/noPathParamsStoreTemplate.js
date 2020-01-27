const noPathParamsStoreTemplate = name => `import {config} from 'config';
import { initStore, fetchWrapper } from 'stores/base';
import { ${name.pascal}State } from 'stores/${name.lower}';

export const store = initStore<${name.pascal}State>();

export const serverFetch = async (): Promise<${name.pascal}State> =>
  await fetchWrapper<${name.pascal}State>(config.stores.${name.camel}.url);
`;

module.exports = noPathParamsStoreTemplate;
