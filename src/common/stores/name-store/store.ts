import { BaseStore } from 'stores/base-store';

export interface NameStoreState {
  items: string[];
}

export class NameStore extends BaseStore<NameStoreState> {
  async fetch(): Promise<void> {
    this.state.items = [];
    this.state.items = await this.getItems();
  }

  public getItems(): Promise<string[]> {
    // call api or something that returns a promise
    return Promise.resolve(['item 1', 'item 2']);
  }
}
