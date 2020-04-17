import { Key } from 'path-to-regexp';

const statelessView = (pascalViewName: string) => `import React, { FunctionComponent } from 'react';
import { useLocalizationStore } from 'stores/platform/localization-store';

const ${pascalViewName}: FunctionComponent = () => {
  const [{ getLoc }] = useLocalizationStore();

  return (
    <div>{getLoc('helloWorld', { name: 'world!' })}</div>
  );
};

export default ${pascalViewName};
`;

const staticStatefulView = (pascalViewName: string) => `import React, { FunctionComponent } from 'react';
import { StatefulProps } from './types';
import { useLocalizationStore } from 'stores/platform/localization-store';

const ${pascalViewName}: FunctionComponent<StatefulProps> = ({ error, loading }: StatefulProps) => {
  const [{ getLoc }] = useLocalizationStore();

  if (error || loading) {
    return null;
  }

  return <div>{getLoc('greeting', { name: 'world!' })}</div>;
};

export default ${pascalViewName};
`;

const dynamicStatefulView = (
  pascalViewName: string,
  params: Key[]
) => `import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { StatefulProps } from './types';
import { useLocalizationStore } from 'stores/platform/localization-store';
import { logger } from 'utils/logger';

interface ${pascalViewName}Params {
  ${getParams(params)}
}

const ${pascalViewName}: FunctionComponent<StatefulProps> = ({ error, loading }: StatefulProps) => {
  const [{ getLoc }] = useLocalizationStore();
  const params = useParams<${pascalViewName}Params>();

  logger.info(params);

  if (error || loading) {
    return null;
  }

  return <div>{getLoc('greeting', { name: 'world!' })}</div>;
};

export default ${pascalViewName};
`;

const getParams = (params: Key[]) => params.map(param => `${param.name}: string;`).join();

export const view = (isStateful: boolean, viewName: string, params: Key[] = []) =>
  isStateful
    ? params.length
      ? dynamicStatefulView(viewName, params)
      : staticStatefulView(viewName)
    : statelessView(viewName);
