import { BaseStore } from 'stores/base-store';
import { logger } from 'utils/logger';

export interface ServerContextState {
  location: string;
  language: string;
  region: string;
  locale: string;
  isServerLoad: boolean;
}

export class ServerContextStore extends BaseStore<ServerContextState> {
  public async fetch(): Promise<void> {
    return Promise.resolve();
  }
}
