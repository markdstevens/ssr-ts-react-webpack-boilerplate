import { BaseStore } from 'stores/base-store';
import { logger } from 'utils/logger';

export interface TodoState {
  todos?: string[];
  loading: boolean;
  error: string;
}

export class TodoStore extends BaseStore<TodoState> {
  constructor(initialState: TodoState) {
    super(initialState);
    this.fetch = this.fetch.bind(this);
  }

  async fetch(): Promise<void> {
    this.state.loading = true;
    this.state.error = '';

    await this.addTodo();

    this.state.loading = false;
  }

  public async addTodo(): Promise<void> {
    this.state.todos = (this.state.todos || []).concat(['hi']);
  }
}
