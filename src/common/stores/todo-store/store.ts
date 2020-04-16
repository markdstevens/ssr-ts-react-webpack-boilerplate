import { BaseStore } from 'stores/base-store';

export interface TodoState {
  todos?: string[];
}

export class TodoStore extends BaseStore<TodoState> {
  constructor(initialState: TodoState) {
    super(initialState);
    this.fetch = this.fetch.bind(this);
  }

  async fetch(): Promise<void> {
    this.state.todos = [];
    this.state.todos = await this.getTodos();
  }

  public getTodos(): Promise<string[]> {
    return Promise.resolve(['say hi to jasmin']);
  }
}
