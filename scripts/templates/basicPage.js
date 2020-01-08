const basicPageTemplate = (name) => (
  `import React, {FunctionComponent} from 'react';

const ${name.pascal}: FunctionComponent<void> = () => (
  <h1>
    {'It\\'s working!'}
  </h1>
);
${name.pascal}.displayName = '${name.pascal}';

export default ${name.pascal};
`);

module.exports = basicPageTemplate;
