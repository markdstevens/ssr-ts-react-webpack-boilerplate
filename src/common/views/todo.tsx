import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { StatefulProps } from './types';
import { useLocalizationStore } from 'stores/platform/localization-store';
import { logger } from 'utils/logger';

interface TodoParams {
  id: string;
}

const Todo: FunctionComponent<StatefulProps> = ({ error, loading }: StatefulProps) => {
  const [{ getLoc }] = useLocalizationStore();
  const params = useParams<TodoParams>();

  logger.info(params);

  if (error || loading) {
    return null;
  }

  return <div>{getLoc('greeting', { name: 'world!' })}</div>;
};

export default Todo;
