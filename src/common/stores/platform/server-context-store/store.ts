import { BaseStore } from 'stores/base-store';

export interface ServerContextState {
  location: string;
  language: string;
  region: string;
  locale: string;
}

export class ServerContextStore extends BaseStore<ServerContextState> {
  constructor(initialState: ServerContextState) {
    super(initialState);
  }

  public async fetch(): Promise<void> {
    return Promise.resolve();
  }
}
