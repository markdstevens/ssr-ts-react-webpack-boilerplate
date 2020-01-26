const dataFetchingPageTemplateWithPathParams = (name, keys) => {
  return `import React, {FunctionComponent} from 'react';
import {${name.pascal}State, ${name.pascal}Props, store} from 'stores/${
    name.lower
  }';
import {useDataFetching} from 'hooks/use-data-fetching';
import {config} from 'config';

const ${name.pascal}: FunctionComponent<${name.pascal}Props> = (
    {match}: ${name.pascal}Props
) => {
  /**
   * update this variable to use match.params to form the correct API url
   *
   * You have access to:
   *  ${keys.map(key => `match.params.${key.name}`).join('\n')}
   */
  const {url} = config.stores.${name.camel};
  const [state, dispatch] = store.useCustomState();
  const {
    loading,
    error
  } = useDataFetching<${name.pascal}State>(url, state, dispatch);

  if (loading || error) {
    return (
      <div>{loading ? 'Loading...' : error}</div>
    );
  }

  return (
    <div>
      {
      /**
        *
        * Custom code here!
        *
        */
      }
    </div>
  );
};
${name.pascal}.displayName = '${name.pascal}';

export default ${name.pascal};
`;
};

module.exports = dataFetchingPageTemplateWithPathParams;
