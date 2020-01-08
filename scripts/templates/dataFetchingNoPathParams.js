const dataFetchingPageTemplateNoPathParams = (name) => (
  `import React, {FunctionComponent} from 'react';
import {${name.pascal}State, store} from 'stores/${name.lower}';
import {useDataFetching} from 'hooks/use-data-fetching';
import {config} from 'config';

const ${name.pascal}: FunctionComponent<void> = () => {
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
`);

module.exports = dataFetchingPageTemplateNoPathParams;
