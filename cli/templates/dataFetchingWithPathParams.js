const dataFetchingPageTemplateWithPathParams = (name, keys) => {
  return `import React, { FunctionComponent } from 'react';
import { ${name.pascal}State, ${name.pascal}Props, store } from 'stores/${name.lower}';
import { useDataFetching } from 'hooks/use-data-fetching';
import { config } from 'config';

const ${name.pascal}: FunctionComponent<${name.pascal}Props> = ({
  match: { params }
}: ${name.pascal}Props) => {
  const [state, dispatch] = store.useCustomState();
  const { loading, error } = useDataFetching<${name.pascal}State>(
    config.stores.${name.camel}.url,
    params,
    state,
    dispatch
  );

  if (loading || error) {
    return <div>{loading ? 'Loading...' : error}</div>;
  }

  return <div>{/* state?.data?. */}</div>;
};
${name.pascal}.displayName = '${name.pascal}';

export default ${name.pascal};
`;
};

module.exports = dataFetchingPageTemplateWithPathParams;
