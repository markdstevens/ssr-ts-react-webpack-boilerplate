import React, { FunctionComponent } from 'react';
import { StatefulProps } from './types';
import { useLocalizationStore } from 'stores/platform/localization-store';
import { Link } from 'react-router-dom';
import { useTodoStore } from 'stores/todo-store';
import { logger } from 'utils/logger';

const Todo: FunctionComponent<StatefulProps> = () => {
  const [{ getLoc }] = useLocalizationStore();
  const [todoState] = useTodoStore();

  if (todoState.loading) {
    return <div>Loading!!!</div>;
  }

  return (
    <>
      <Link to="/todo/show/mark">Name</Link>
      <div>{getLoc('greeting', { name: 'world!' })}</div>

      <ul>
        {todoState.todos?.map((todo, index) => (
          <li key={`${todo}-${index}`}>{todo}</li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
