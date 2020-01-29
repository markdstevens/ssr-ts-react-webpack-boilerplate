const dataFetchingPageTemplateNoPathParams = (name) => (
  `import React, { FC } from 'react';
import { ${name.pascal}Props } from 'stores/${name.lower}';

const ${name.pascal}: FC<${name.pascal}Props> = ({ state, loading, error }: ${name.pascal}Props) => {
  if (loading || error) {
    return <div>{loading ? 'Loading...' : error}</div>;
  }

  return <div>{/* state?.data?. */}</div>;
};
${name.pascal}.displayName = '${name.pascal}';

export default ${name.pascal};
`);

module.exports = dataFetchingPageTemplateNoPathParams;
