import React, { FunctionComponent } from 'react';
import { useTodoStore } from 'stores/todo-store';
import { useLocalizationStore } from 'stores/platform/localization-store';
import { useHistory, Link } from 'react-router-dom';
import { StatefulProps } from './types';

let index = 0;

const Todo: FunctionComponent<StatefulProps> = ({ error, loading }: StatefulProps) => {
  const [todoState, updateTodos] = useTodoStore();
  const history = useHistory();
  const [{ getLoc }] = useLocalizationStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!todoState.todos?.length && (error || loading)) {
    return null;
  }

  return (
    <>
      <Link to="/todo/hellos">{getLoc('navBarTitle')}</Link>
      <ul>
        {todoState.todos?.map((todo, index) => (
          <li key={`${todo}-${index}`}>{todo}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          const todos = Object.assign([], todoState.todos);
          todos.push(`new todo ${index++}!`);
          updateTodos({ todos });
        }}
      >
        Add todo
      </button>

      <form
        action="/todo/hello"
        onSubmit={e => {
          e.preventDefault();
          history.push(`/todo/hello${index++}`);
        }}
      >
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Todo;
